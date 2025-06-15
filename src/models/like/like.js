const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeOnPostId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "postType",
  },
});
