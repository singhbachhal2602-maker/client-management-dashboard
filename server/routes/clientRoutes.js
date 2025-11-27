import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new client
router.post("/", async (req, res) => {
  try {
    const { name, email, company } = req.body;
    if (!name || !email || !company) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Client with this email already exists." });
    }

    const newClient = new Client({ name, email, company });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Error saving client:", err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// Update client
router.put("/:id", async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete client
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
