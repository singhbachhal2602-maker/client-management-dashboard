import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import clientRoutes from "./routes/clientRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// ✅ Load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // enables JSON body parsing

// ✅ Use environment variables or fallback for local dev
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Test route
app.get("/", (req, res) => res.send("Server running successfully 🚀"));

// ✅ Mount routes
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/auth", authRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));