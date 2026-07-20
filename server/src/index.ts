import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToMongoDB } from "./config/db.js";
import { ai } from "./lib/gemini.js";
import { ObjectId } from "mongodb";


// console.log("API KEY:", process.env.GEMINI_API_KEY);
// console.log("AI Object:", ai);
// console.log("API KEY:", process.env.GEMINI_API_KEY);
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

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    // console.log("Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    // console.log("Gemini Response:", response);

    res.json({
      success: true,
      result: response.text,
    });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
});

app.post("/api/ai/study-notes", async (req, res) => {
  console.log(req.body);
  try {
    const { topic, level, length } = req.body;

    const prompt = `
          You are an expert programming instructor.

          Generate structured study notes.

          Topic: ${topic}
          Difficulty: ${level}
          Length: ${length}

          Return markdown.

          Include:

          # Title

          ## Overview

          ## Key Concepts

          ## Real-world Example

          ## Best Practices

          ## Common Mistakes

          ## Practice Questions (5)

          ## Summary
        `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({
      success: true,
      result: response.text,
    });

  } catch (error: any) {
    console.error("Study Notes Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.post("/api/resources", async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");
    const {
      userId,
      title,
      category,
      type,
      level,
      shortDescription,
      description,
      url,
      image,
      tags
    } = req.body;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required"
      });
    }
    const resource = {
      userId,
      title,
      category,
      type,
      level,
      shortDescription,
      description,
      url,
      image,
      tags,
      createdAt: new Date()
    };
    const result = await resourcesCollection.insertOne(resource);
    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: {
        id: result.insertedId,
        ...resource
      }
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
app.get("/api/resources/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");
    const resources = await resourcesCollection.find({
      userId: userId
    }).toArray();
    res.json({
      success: true,
      data: resources
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
app.get("/api/resources", async (req, res) => {
  try {
    const client = await connectToMongoDB();

    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");

    const resources = await resourcesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      data: resources,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/api/resource/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const client = await connectToMongoDB();

    const db = client.db("SkillPilot-AI");

    const resourcesCollection = db.collection("resources");

    const resource = await resourcesCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.patch("/api/resources/:id", async (req, res) => {
  try {

    const { id } = req.params;

    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");


    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };


    const result = await resourcesCollection.updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: updateData
      }
    );


    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Resource not found"
      });
    }


    res.json({
      success: true,
      message: "Resource updated successfully"
    });


  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});

app.delete("/api/resources/:id", async (req, res) => {

  try {

    const { id } = req.params;


    const client = await connectToMongoDB();

    const db = client.db("SkillPilot-AI");

    const resourcesCollection = db.collection("resources");


    const result = await resourcesCollection.deleteOne({
      _id: new ObjectId(id)
    });



    if (result.deletedCount === 0) {

      return res.status(404).json({
        success: false,
        message: "Resource not found"
      });

    }



    res.json({
      success: true,
      message: "Resource deleted successfully"
    });



  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });

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