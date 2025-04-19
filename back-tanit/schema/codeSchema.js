const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  code: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  method: { type: String, required: true },
});

const codeCollection = mongoose.model("code", codeSchema);
module.exports = codeCollection;
