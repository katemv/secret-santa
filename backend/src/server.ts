import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import groupRoutes from "./routes/groups";
import participantRoutes from "./routes/participants";
import assignmentRoutes from "./routes/assignments";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/groups", groupRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/assignments", assignmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ message: "Naughty and Nice API is running! 🎄" });
});

// MongoDB connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/naughty-and-nice";
        await mongoose.connect(mongoURI);
        console.log("🎄 Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🎅 Naughty and Nice server running on port ${PORT}`);
    });
};

startServer(); 