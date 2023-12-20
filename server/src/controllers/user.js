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
