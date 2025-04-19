const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  method: { type: String },

  role: { type: String, default: "companyadmin" },
  status: {
    type: String,
    default: "unverified",
    enum: ["verified", "unverified"],
  },
  services: [{ type: String }],
  links: [{ type: String }],

  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "jobs" }],
});

const companyCollection = mongoose.model("companies", companySchema);
module.exports = companyCollection;
