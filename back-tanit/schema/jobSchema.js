const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  description: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  requirements: { type: String, required: true },
  candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  company: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
});

const jobCollection = mongoose.model("jobs", jobSchema);

module.exports = jobCollection;
