import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    client: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Overdue"],
      default: "Pending",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
