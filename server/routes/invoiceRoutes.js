import express from "express";
import Invoice from "../models/Invoice.js";

const router = express.Router();

// GET all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new invoice
router.post("/", async (req, res) => {
  console.log(" Incoming invoice data:", req.body); // debug line
  try {
    const { invoiceNumber, client, amount, status, date } = req.body;

    if (!invoiceNumber || !client || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newInvoice = new Invoice({
      invoiceNumber,
      client,
      amount,
      status: status || "Pending",
      date: date || new Date(),
    });

    const saved = await newInvoice.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(" Error saving invoice:", err);
    res.status(500).json({ message: err.message });
  }
});

//  PUT update invoice
router.put("/:id", async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//  DELETE invoice
router.delete("/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
