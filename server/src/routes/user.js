import express from "express";
import multer from "multer";

import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser,
  favoriteGym,
  updateUserProfile,
  deleteUserProfile,
  getUserProfile,
} from "../controllers/user.js";

const userRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/:userId/favorite-gyms", favoriteGym);
userRouter.put("/:id", updateUser);
userRouter.get("/:id/profile", upload.single("profilePhoto"), getUserProfile);
userRouter.put(
  "/:id/profile-photo",
  upload.single("profilePhoto"),
  updateUserProfile
);
userRouter.delete("/:id/profile-photo", deleteUserProfile);

userRouter.delete("/:id", deleteUser);

export default userRouter;
