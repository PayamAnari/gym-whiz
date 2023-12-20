import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: [String], required: true },
    picture: { type: [String], required: true },
    rating: { type: Number, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Gym = mongoose.model("gyms", gymSchema);

export default Gym;
