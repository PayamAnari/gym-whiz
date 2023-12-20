import mongoose from "mongoose";

import validateAllowedFields from "../util/validateAllowedFields.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    favoriteGyms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gym",
      },
    ],
    profilePhoto: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "firstName",
    "lastName",
    "email",
    "password",
    "age",
    "weight",
    "height",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);

  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }

  if (userObject.firstName == null) {
    errorList.push("firstName is a required field");
  }
  if (userObject.lastName == null) {
    errorList.push("lastName is a required field");
  }

  if (userObject.email == null) {
    errorList.push("email is a required field");
  }
  if (userObject.password == null) {
    errorList.push("password is a required field");
  }

  if (userObject.age && typeof userObject.age !== "number") {
    errorList.push("age must be a number");
  }

  if (userObject.weight && typeof userObject.weight !== "number") {
    errorList.push("weight must be a number");
  }

  if (userObject.height && typeof userObject.height !== "number") {
    errorList.push("height must be a number");
  }

  return errorList;
};

export default User;
