const HindiMovies = require('../../models/movies/hindiMovied')

exports.postHindiMovies = async (req , res)=>{
    try{
        const {title, description, thumbnail, videoUrl} = req.body;
        if(!title || !description || !thumbnail || !videoUrl){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const hindiMovies = new HindiMovies({
            title,
            description,
            thumbnail,
            videoUrl
        });
        await hindiMovies.save();
        res.status(201).json({message:"Hindi Movies added successfully" , hindiMovies})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"hindi movies not upload please try again  "+error})
    }
}


exports.getHindiMovies = async (req, res) => {
    try {
        const hindiMovies = await HindiMovies.find();
        res.status(200).json({ message: "Hindi Movies fetched successfully", hindiMovies });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

