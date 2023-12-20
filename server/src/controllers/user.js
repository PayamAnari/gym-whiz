import User, { validateUser } from "../models/User.js";
import { logError } from "../util/logging.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, result: users });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get users, try again later" });
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
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (typeof user !== "object") {
      res.status(400).json({
        success: false,
        msg: `You need to provide a 'user' object. Received: ${JSON.stringify(
          user
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
      .json({ success: false, msg: "Unable to create user, try again later" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user } = req.body;

    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      return res.status(404).json({ success: false, msg: "No user found!" });
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userData.password
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
        .json({ success: false, msg: "Invalid credentials!" });
    }
  } catch (error) {
    logError(error);
    return res

      .status(500)
      .json({ success: false, msg: "Unable to login user, try again later" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, password, age, weight, height } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // If user not found, send an error response
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Update first name, last name, and additional fields if provided
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (age) user.age = age;
    if (weight) user.weight = weight;
    if (height) user.height = height;

    // Update password if provided
    if (password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Remove the password from the response
    const userWithoutPassword = updatedUser.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to update user" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, msg: "User deleted successfully" });
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to delete user" });
  }
};

export const favoriteGym = async (req, res) => {
  const { gymId } = req.body;
  const userId = req.params.userId;

  try {
    const updatedUser = await User.findById(userId);

    if (updatedUser.favoriteGyms.includes(gymId)) {
      await User.updateOne({ _id: userId }, { $pull: { favoriteGyms: gymId } });
    } else {
      await User.updateOne({ _id: userId }, { $push: { favoriteGyms: gymId } });
    }
    const lastUpdatedUser = await User.findById(userId);

    res.status(200).json({ success: true, user: lastUpdatedUser });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to update user's favorite gyms" });
  }
};

cloudinary.config({
  cloud_name: "dlllvxoen",
  api_key: "362369482937335",
  api_secret: "G-Aci0RJJiJNr7gDm-47TSunIFc",
});

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, password } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const profilePhoto = req.file;

    if (profilePhoto) {
      cloudinary.uploader
        .upload_stream(async (error, result) => {
          if (error) {
            logError(error);
            res.status(400).json({ success: false, msg: "File upload error" });
          } else {
            user.profilePhoto = result.secure_url;
            const updatedUser = await user.save();
            const userWithoutPassword = updatedUser.toObject();
            delete userWithoutPassword.password;
            res.status(200).json({ success: true, user: userWithoutPassword });
          }
        })
        .end(profilePhoto.buffer);
    } else {
      const updatedUser = await user.save();
      const userWithoutPassword = updatedUser.toObject();
      delete userWithoutPassword.password;
      res.status(200).json({ success: true, user: userWithoutPassword });
    }
  } catch (error) {
    logError(error);
    res.status(500).json({ success: false, msg: "Unable to update user" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    user.profilePhoto = "";
    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    logError(error);

    if (error instanceof multer.MulterError) {
      res.status(400).json({ success: false, msg: "File upload error" });
    } else {
      res.status(500).json({ success: false, msg: "Unable to update user" });
    }
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, user: user });
  } catch (error) {
    logError(error);
  }
};
