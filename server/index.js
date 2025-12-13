import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import UserModel from "./models/UserModel.js";
import PostModel from "./models/PostModel.js";

const app = express();
app.use(cors());
app.use(express.json());


const conStr =
  "mongodb+srv://admin:1234@cluster0.k88feh2.mongodb.net/localLens?retryWrites=true&w=majority";

mongoose
  .connect(conStr)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const tripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "" },
    address: { type: String, default: "" },

    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { timestamps: true }
);

const TripModel = mongoose.model("trips", tripSchema);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password.startsWith("$2b$")) {
      if (password !== user.password)
        return res.status(401).json({ message: "Wrong credentials" });

      user.password = await bcrypt.hash(password, 10);
      await user.save();
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        return res.status(401).json({ message: "Wrong credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        uname: user.uname,
        email: user.email,
        role: user.role,
        profilepic: user.profilepic,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { uname, email, password, profilepic } = req.body;

    if (!uname || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      uname,
      email,
      password: hashedPassword,
      role: "user",
      profilepic: profilepic || "",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        uname: newUser.uname,
        email: newUser.email,
        role: newUser.role,
        profilepic: newUser.profilepic,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email, lat, lng } = req.body;
    const newPost = new PostModel({ postMsg, email, lat, lng });
    await newPost.save();
    res.json({ message: "Post saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/showPosts", async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "email",
          foreignField: "email",
          as: "user",
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          "user.password": 0,
          "user.__v": 0,
          "user.email": 0,
        },
      },
    ]);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/trips", async (req, res) => {
  try {
    const { name, price, image, description, address, location } = req.body;

    if (!name || !price || !image)
      return res.status(400).json({ message: "Missing required fields" });

    const newTrip = new TripModel({
      name,
      price,
      image,
      description,
      address,
      location,
    });

    await newTrip.save();

    res.status(201).json({
      message: "Trip added successfully",
      trip: newTrip,
    });
  } catch (error) {
    console.error("Add Trip Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/trips", async (req, res) => {
  try {
    const trips = await TripModel.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/update-trip/:id", async (req, res) => {
  try {
    const trip = await TripModel.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/update-trip/:id", async (req, res) => {
  try {
    const { name, price, image, description, address, location } = req.body;

    const updatedTrip = await TripModel.findByIdAndUpdate(
      req.params.id,
      { name, price, image, description, address, location },
      { new: true }
    );

    if (!updatedTrip)
      return res.status(404).json({ message: "Trip not found" });

    res.json({
      message: "Trip updated successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    console.error("Update Trip Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/update-trip/:id", async (req, res) => {
  try {
    await TripModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
