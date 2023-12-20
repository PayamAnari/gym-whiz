import express from "express";
import cors from "cors";

import userRouter from "./routes/user.js";
import gymRouter from "./routes/gym.js";
import reviewRouter from "./routes/review.js";

// Create an express server
const app = express();

app.use(cors());
// Tell express to use the json middleware
app.use(express.json());

// Allow everyone to access our API. In a real application, we would need to restrict this!

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/user", userRouter);
app.use("/api/gym", gymRouter);
app.use("/api/reviews", reviewRouter);

export default app;
