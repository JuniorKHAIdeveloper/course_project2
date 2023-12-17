const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  devices: [
    {
      type: String,
    },
  ],
  rooms: [
    {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      devices: { type: [String] },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
