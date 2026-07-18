import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToMongoDB } from "./config/db.js";

dotenv.config();
// console.log("MONGODB_URI:", process.env.MONGODB_URI);
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("SkillPilot AI Server Running");
});

app.get("/courses", async (req, res) => {
  try {
    const client = await connectToMongoDB();

    const db = client.db("skillpilot-ai");
    const coursesCollection = db.collection("courses");

    const courses = await coursesCollection.find({}).toArray();

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

const startServer = async () => {
  try {
    await connectToMongoDB();

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();