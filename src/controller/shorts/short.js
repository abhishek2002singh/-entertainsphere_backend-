const Shorts = require('../../models/shorts/shorts')

exports.postShorts = async (req , res)=>{
    try{
        const userId = req.user?._id;

        if(!userId){
            return res.status(401).json({message:"Unauthorized user"})
        }
        const {title, description, thumbnail, videoUrl} = req.body;
        if(!title || !description || !thumbnail || !videoUrl){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const shorts = new Shorts({
            userId,
            title,
            description,
            thumbnail,
            videoUrl
        });
        await shorts.save();
        res.status(201).json({message:"Hindi Movies added successfully" , shorts})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"hindi movies not upload please try again  "+error})
    }
}


exports.getshorts = async (req, res) => {
  try {
    const shorts = await Shorts.find()
      .populate({
        path: 'userId',
        select: 'firstName lastName photoUrl' 
      })
      

    res.status(200).json({ message: "Hindi Movies fetched successfully", shorts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


