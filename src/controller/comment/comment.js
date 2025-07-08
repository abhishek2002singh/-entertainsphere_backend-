const Comment = require("../../models/comment/comment");

exports.postComment = async (req, res) => {
  try {
    const userId = req.user?._id;
    const commentOnPostId = req.param;
    const comment = req.body;
    if (!userid || !commentOnPostId) {
      res.status(401).json({
        success: false,
        message: "user id and post id not defined",
      });
    }

    const com = await new Comment.create({
      userid,
      commentOnPostId,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "success comment crate",
      com,
    });
  } catch (error) {
    message: "some internal error please check your code", console.error(error);
  }
};

exports.getComment = async (req , res) =>{
  try{
    

  }catch(error){

  }
}
