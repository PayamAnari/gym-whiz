import Gym from "../models/Gym.js";
import { logError } from "../util/logging.js";

export const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();
    res.status(200).json({ success: true, result: gyms });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get gyms, try again later" });
  }
};

export const searchGyms = async (req, res) => {
  try {
    const query = req.query.query;

    // Use regex for a case-insensitive search
    const gymsByName = await Gym.find({
      name: { $regex: new RegExp(query, "i") },
    });

    const gymsByCity = await Gym.find({
      city: { $regex: new RegExp(query, "i") },
    });

    const gymsByCategory = await Gym.find({
      category: { $regex: new RegExp(query, "i") },
    });

    const gyms = [...gymsByName, ...gymsByCity, ...gymsByCategory];

    if (gyms.length === 0) {
      res.status(404).json({ success: false, msg: "Not found" });
    } else {
      res.status(200).json({ success: true, result: gyms });
    }
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to search gyms, try again later" });
  }
};

export const getSpecificGym = async (req, res) => {
  try {
    const gymId = req.params.id;
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res.status(200).json({ success: true, result: gym });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to get the gym, try again later" });
  }
};

export const createGym = async (req, res) => {
  try {
    const { name, category, picture, rating, city } = req.body;

    const gymExists = await Gym.findOne({ name });

    if (gymExists) {
      return res
        .status(400)
        .json({ success: false, message: "Gym already exists" });
    }

    const newGym = await Gym.create({
      name,
      category,
      picture,
      rating,
      city,
    });

    res.status(201).json({ success: true, gym: newGym });
  } catch (error) {
    logError(error);
    res
      .status(500)
      .json({ success: false, msg: "Unable to create gym, try again later" });
  }
};
