const TrandingMovies = require("../../models/movies/uploadtrandingMovies");
  
exports.postTrandingMovies =async (req , res)=>{
    try{
        const {title, description, thumbnail, videoUrl} = req.body;
        if(!title || !description || !thumbnail || !video){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        
        const trandingMovies = new TrandingMovies({
            title,
            description,
            thumbnail,
            videoUrl
        });
        await trandingMovies.save();
        res.status(201).json({message:"Tranding Movies added successfully" , trandingMovies})

    }catch(e){
        console.log(e);
        res.status(500).json({message:"Internal server error"})
    }

}

exports.getTrandingMovies = async (req, res) => {
    try {
        const trandingMovies = await TrandingMovies.find();
        res.status(200).json({ message: "Tranding Movies fetched successfully", trandingMovies });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
}   

