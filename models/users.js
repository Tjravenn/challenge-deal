const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true, // 1: Admin, 2: User
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
