const mongoose = require("mongoose");

const panjabiSongSchema = new mongoose.Schema(
  {
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
    songUrl: {
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
  },
  { timestamps: true }
);

const PanjabiSong = mongoose.model("PanjabiSong", panjabiSongSchema);
module.exports = PanjabiSong;
