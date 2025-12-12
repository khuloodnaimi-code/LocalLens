import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/UserModel.js';
import PostModel from './models/PostModel.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const conStr = "mongodb+srv://admin:1234@cluster0.k88feh2.mongodb.net/localLens?retryWrites=true&w=majority";

mongoose.connect(conStr)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// -----------------------------
// LOGIN
// -----------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Wrong credentials" });

    res.status(200).json({
      user: {
        _id: user._id,
        uname: user.uname,
        email: user.email,
        role: user.role,
        profilepic: user.profilepic
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// -----------------------------
// REGISTER
// -----------------------------
app.post("/register", async (req, res) => {
  try {
    const { uname, email, password, profilepic } = req.body;

    if (!uname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      uname,
      email,
      password: hashedPassword,
      role: "user", // default role
      profilepic: profilepic || ""
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        uname: newUser.uname,
        email: newUser.email,
        role: newUser.role,
        profilepic: newUser.profilepic
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error. Please try again later.", error });
  }
});

// -----------------------------
// SAVE POST
// -----------------------------
app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email, lat, lng } = req.body;
    const newPost = new PostModel({ postMsg, email, lat, lng });
    await newPost.save();
    res.status(200).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error("SavePost error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// -----------------------------
// SHOW POSTS
// -----------------------------
app.get("/showPosts", async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "user"
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          "user._id": 0,
          "user.password": 0,
          "user.__v": 0,
          "user.email": 0
        }
      }
    ]);

    res.json(posts);
  } catch (error) {
    console.error("ShowPosts error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
