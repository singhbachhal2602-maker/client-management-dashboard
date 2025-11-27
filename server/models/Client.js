import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Client", clientSchema);
