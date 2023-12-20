import express from "express";
import {
  createGym,
  getGyms,
  searchGyms,
  getSpecificGym,
} from "../controllers/gym.js";

const gymRouter = express.Router();

gymRouter.get("/", getGyms);
gymRouter.get("/search", searchGyms);
gymRouter.get("/:id", getSpecificGym);
gymRouter.post("/create", createGym);

export default gymRouter;
