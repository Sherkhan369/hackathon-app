const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  tags: [String],
  urgency: String,
  location: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "open",
  }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);