const Comment = require("../../models/comment/comment");
const Shorts = require("../../models/shorts/shorts");

//comment on short

exports.postComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const commentOnPostId = req.params.id;

    const { comment, parentCommentId } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment text is required." });
    }

    const newComment = await Comment.create({
      userId,
      commentOnPostId,
      comment,
      parentCommentId: parentCommentId || null,
    });

    await Shorts.findByIdAndUpdate(
      commentOnPostId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    return res.status(201).json({ success: true, data: newComment });
  } catch (err) {
    console.error("Post Comment Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//get comment

const buildCommentTree = (comments, parentId = null) => {
  return comments
    .filter((comment) => String(comment.parentCommentId) === String(parentId))
    .map((comment) => ({
      ...comment.toObject(),
      replies: buildCommentTree(comments, comment._id),
    }));
};

exports.getCommentsForPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ commentOnPostId: postId })
      .populate("userId", "firstName lastName emailId") 
      .sort({ createdAt: 1 });

    const nestedComments = buildCommentTree(comments);

    res.status(200).json({ success: true, data: nestedComments });
  } catch (error) {
    console.error("Get Comments Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
