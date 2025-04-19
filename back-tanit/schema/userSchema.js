const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  method: { type: String },
  experience: { type: String },
  links: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  applied: [{ type: mongoose.Schema.Types.ObjectId,ref:"jobs" }],

  // role: {
  //   type: String,
  //   default: "client",
  //   enum: ["client", "company", "admin"],
  // },
});

const collectionUser = mongoose.model("users", userSchema);

module.exports = collectionUser;
