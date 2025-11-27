import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  deadline: { type: String, required: true },
  progress: { type: Number, default: 0 },
  status: { type: String, default: "Pending" },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
