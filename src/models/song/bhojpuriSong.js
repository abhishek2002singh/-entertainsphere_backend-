const mongoose = require("mongoose");

const bhojpuriSong = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  bhojpurisongUrl: {
    type: String,
    required: true,
    trim: true,
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  dislike: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dislike",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
});

const BhojpuriSong = mongoose.model("BhojpuriSong", bhojpuriSong);
module.exports = BhojpuriSong;
