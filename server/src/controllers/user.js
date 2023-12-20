import User, { validateUser } from '../models/User.js';
import { logError } from '../util/logging.js';
import validationErrorMessage from '../util/validationErrorMessage.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: 'Unable to get users, try again later' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = req.body;
    const { email, firstName, lastName, password } = user;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (typeof user !== 'object') {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user,
        )}`,
      });

      return;
    }

    const errorList = validateUser(user);

    if (errorList.length > 0) {
      res
        .status(400)
        .json({ success: false, msg: validationErrorMessage(errorList) });
    } else {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const userObject = newUser.toObject();
      // Remove the password property
      delete userObject.password;
      // return the user object without the password
      res.status(201).json({ success: true, user: userObject });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: 'Unable to create user, try again later' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user } = req.body;

    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      return res.status(404).json({ success: false, msg: 'No user found!' });
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userData.password,
    );

    if (isPasswordValid) {
      // Convert the document to a JavaScript object
      const userObject = userData.toObject();
      // Remove the password property
      delete userObject.password;
      // Now, return the user object without the password
      return res.status(200).json({ success: true, user: userObject });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid credentials!' });
    }
  } catch (error) {
    logError(error);
    return res

      .status(500)
      .json({ success: false, msg: 'Unable to login user, try again later' });
  }
};
