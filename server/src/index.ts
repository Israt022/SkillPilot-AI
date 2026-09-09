import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectToMongoDB } from "./config/db.js";
import { ai } from "./lib/gemini.js";
import { ObjectId } from "mongodb";

const app = express();

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "10mb" }));

const port = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// MIDDLEWARE: requireAdmin
// Verifies the Bearer token with Better Auth (Next.js),
// then checks that the session user has role === "admin".
// ─────────────────────────────────────────────
async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "Unauthorized: no token" });
      return;
    }
    const token = authHeader.slice(7);

    // 1. Direct MongoDB session check (fast & 100% reliable)
    try {
      const client = await connectToMongoDB();
      const db = client.db("SkillPilot-AI");
      const sessionDoc = await db.collection("session").findOne({ token });
      if (sessionDoc) {
        const isNotExpired = !sessionDoc.expiresAt || new Date(sessionDoc.expiresAt) > new Date();
        if (isNotExpired) {
          let userDoc: any = null;
          try {
            userDoc = await db.collection("user").findOne({
              $or: [
                { _id: new ObjectId(sessionDoc.userId) },
                { id: sessionDoc.userId },
                { _id: sessionDoc.userId as any },
              ],
            });
          } catch {
            userDoc = await db.collection("user").findOne({ id: sessionDoc.userId });
          }

          if (userDoc && userDoc.role === "admin") {
            (req as any).adminUser = userDoc;
            return next();
          }
        }
      }
    } catch (dbErr) {
      console.error("DB session lookup error in requireAdmin:", dbErr);
    }

    // 2. HTTP fallback check with Better Auth
    const betterAuthUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
    try {
      const sessionRes = await fetch(`${betterAuthUrl}/api/auth/get-session`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `better-auth.session_token=${token}`,
        },
      });

      if (sessionRes.ok) {
        const sessionData = await sessionRes.json();
        if (sessionData?.user && sessionData.user.role === "admin") {
          (req as any).adminUser = sessionData.user;
          return next();
        }
      }
    } catch (httpErr) {
      console.error("HTTP session lookup error in requireAdmin:", httpErr);
    }

    res.status(403).json({ success: false, message: "Forbidden: admin access required" });
  } catch (error: any) {
    console.error("requireAdmin error:", error);
    res.status(500).json({ success: false, message: "Auth verification failed" });
  }
}

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("SkillPilot AI Server Running");
});

// Get all categories - Public
app.get("/api/categories", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");

    const categories = await db
      .collection("categories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load categories",
    });
  }
});

app.patch("/api/profile/:id", async (req, res) => {
  try {
    const id = req.params.id as string;
    const { name, image } = req.body;

    if (!ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (name !== undefined) {
      updateData.name = name.trim();
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");

    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    console.error("Profile update error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ─────────────────────────────────────────────
// COURSES (legacy)
// ─────────────────────────────────────────────
app.get("/courses", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("skillpilot-ai");
    const coursesCollection = db.collection("courses");
    const courses = await coursesCollection.find({}).toArray();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
});

// ─────────────────────────────────────────────
// AI ENDPOINTS
// ─────────────────────────────────────────────
// app.post("/api/ai", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const response = await ai.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: prompt,
//     });
//     res.json({ success: true, result: response.text });
//   } catch (error: any) {
//     console.error("FULL ERROR:", error);
//     res.status(500).json({ success: false, message: error.message, stack: error.stack });
//   }
// });
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, image } = req.body;

    if (!prompt?.trim() && !image) {
      res.status(400).json({
        success: false,
        message: "Prompt or image is required",
      });
      return;
    }

    let contents: any;

    if (image) {
      const match = image.match(/^data:(image\/[^;]+);base64,(.+)$/);

      if (!match) {
        res.status(400).json({
          success: false,
          message: "Invalid image format",
        });
        return;
      }

      const mimeType = match[1];
      const base64Data = match[2];

      contents = [
        {
          text:
            prompt?.trim() ||
            "Analyze this image and explain what you see in detail.",
        },
        {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        },
      ];
    } else {
      contents = prompt;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
    });

    res.json({
      success: true,
      result: response.text,
    });
  } catch (error: any) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
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
    res.json({ success: true, result: response.text });
  } catch (error: any) {
    console.error("Study Notes Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// RESOURCES (user-facing)
// ─────────────────────────────────────────────
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
      tags,
    } = req.body;
    if (!userId) {
      res.status(400).json({ success: false, message: "User ID required" });
      return;
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
      createdAt: new Date(),
    };
    const result = await resourcesCollection.insertOne(resource);
    res.status(201).json({
      success: true,
      message: "Resource created successfully",
      data: { id: result.insertedId, ...resource },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/resources/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");

    let query: any = { userId };
    try {
      query = { $or: [{ userId }, { userId: new ObjectId(userId) }] };
    } catch {
      query = { userId };
    }

    const resources = await resourcesCollection.find(query).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, data: resources });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, data: resources });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/resource/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");
    const resource = await resourcesCollection.findOne({ _id: new ObjectId(id) });
    if (!resource) {
      res.status(404).json({ success: false, message: "Resource not found" });
      return;
    }
    res.json({ success: true, data: resource });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch("/api/resources/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");
    const updateData = { ...req.body, updatedAt: new Date() };
    const result = await resourcesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ success: false, message: "Resource not found" });
      return;
    }
    res.json({ success: true, message: "Resource updated successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/api/resources/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resourcesCollection = db.collection("resources");
    const result = await resourcesCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Resource not found" });
      return;
    }
    res.json({ success: true, message: "Resource deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN — SETUP (first-time: make a user admin by email)
// Call: GET /admin/setup?email=you@email.com&secret=skillpilot-setup-2024
// Remove or disable this after first use!
// ─────────────────────────────────────────────
app.get("/admin/setup", async (req, res) => {
  try {
    const { email, secret } = req.query;
    if (secret !== "skillpilot-setup-2024") {
      res.status(403).json({ success: false, message: "Invalid secret" });
      return;
    }
    if (!email) {
      res.status(400).json({ success: false, message: "Email required" });
      return;
    }
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const userCollection = db.collection("user");
    const result = await userCollection.updateOne(
      { email: email as string },
      { $set: { role: "admin" } }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, message: `User ${email} is now an admin` });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN — STATS
// ─────────────────────────────────────────────
app.get("/admin/stats", requireAdmin, async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");

    const [totalUsers, totalResources, totalCategories] = await Promise.all([
      db.collection("user").countDocuments(),
      db.collection("resources").countDocuments(),
      db.collection("categories").countDocuments(),
    ]);

    // Recent resources (last 5)
    const recentResources = await db
      .collection("resources")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Recent users (last 5)
    const recentUsers = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalResources,
        totalCategories,
        recentResources,
        recentUsers,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN — USERS
// ─────────────────────────────────────────────
app.get("/admin/users", requireAdmin, async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const users = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch("/admin/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id as String;
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) {
      res.status(400).json({ success: false, message: "Role must be 'user' or 'admin'" });
      return;
    }
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const result = await db
      .collection("user")
      .updateOne({ _id: new ObjectId(id as any) }, { $set: { role } });
    if (result.matchedCount === 0) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    res.json({ success: true, message: `User role updated to '${role}'` });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/admin/users/:id", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id as String;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    // Delete user + their sessions + accounts
    await Promise.all([
      db.collection("user").deleteOne({ _id: new ObjectId(id as any) }),
      db.collection("session").deleteMany({ userId: id }),
      db.collection("account").deleteMany({ userId: id }),
    ]);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN — CATEGORIES
// ─────────────────────────────────────────────
app.get("/admin/categories", requireAdmin, async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Public categories endpoint (for use in resource forms)
app.get("/api/categories", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ name: 1 })
      .toArray();
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/admin/categories", requireAdmin, async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;
    if (!name) {
      res.status(400).json({ success: false, message: "Category name required" });
      return;
    }
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    // Check for duplicate name
    const existing = await db.collection("categories").findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      res.status(409).json({ success: false, message: "Category already exists" });
      return;
    }
    const category = {
      name: name.trim(),
      description: description?.trim() || "",
      icon: icon || "📚",
      color: color || "#6366f1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await db.collection("categories").insertOne(category);
    res.status(201).json({
      success: true,
      message: "Category created",
      data: { _id: result.insertedId, ...category },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch("/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color } = req.body;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const updateData: any = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (icon !== undefined) updateData.icon = icon;
    if (color !== undefined) updateData.color = color;
    const result = await db
      .collection("categories")
      .updateOne({ _id: new ObjectId(id as any) }, { $set: updateData });
    if (result.matchedCount === 0) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.json({ success: true, message: "Category updated" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id as String;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const result = await db
      .collection("categories")
      .deleteOne({ _id: new ObjectId(id as any) });
    if (result.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// ADMIN — RESOURCES (all resources + admin delete)
// ─────────────────────────────────────────────
app.get("/admin/resources", requireAdmin, async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const resources = await db
      .collection("resources")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Enrich with user info
    const userIds = [...new Set(resources.map((r) => r.userId).filter(Boolean))];
    const users = await db
      .collection("user")
      .find({ _id: { $in: userIds.map((id) => { try { return new ObjectId(id); } catch { return null; } }).filter(Boolean) as ObjectId[] } })
      .toArray();
    const userMap = Object.fromEntries(users.map((u) => [u._id.toString(), u]));

    const enriched = resources.map((r) => ({
      ...r,
      user: userMap[r.userId] || null,
    }));

    res.json({ success: true, data: enriched });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/admin/resources/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await connectToMongoDB();
    const db = client.db("SkillPilot-AI");
    const result = await db
      .collection("resources")
      .deleteOne({ _id: new ObjectId(id as any) });
    if (result.deletedCount === 0) {
      res.status(404).json({ success: false, message: "Resource not found" });
      return;
    }
    res.json({ success: true, message: "Resource deleted by admin" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────
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