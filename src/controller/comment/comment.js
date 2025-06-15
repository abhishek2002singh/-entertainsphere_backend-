const Comment = require("../../models/comment/comment");

exports.postComment = async (req, res) => {
  const userid = req.accessUser?._id;
};
