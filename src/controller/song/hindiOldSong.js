const HindiOldSong = require('../../models/song/hindiOldSong');

exports.postHindiOldSong = async (req, res) => {
    try {
        const { title, description, thumbnail, songUrl } = req.body;

        if (!title || !description || !thumbnail || !songUrl) {
            return res.status(400).json({ message: "All fields are required." });

        }

        console.log(req.accessUser?._id )

        const hindiOldSong = new HindiOldSong({
            title,
            description,
            thumbnail,
            songUrl,
            userId: req.accessUser?._id  // if you want to track who added it
        });

        await hindiOldSong.save();

        res.status(201).json({ message: "Hindi old song added successfully." });

    } catch (error) {
        console.error("Error adding song:", error);
        res.status(500).json({ message: "Failed to add Hindi old song." });
    }
};

exports.getHindiOldSong = async (req , res) => {
    try{
        const userId = req.accessUser?._id
        if(!userId){
            return res.status(400).json({ message: "first login ." });
        }
        const hindiOldSong = await HindiOldSong.find()
        res.status(200).json({ message: "hindi old song fetched successfully", hindiOldSong });

    }catch(error){
        console.error(error)
        res.status(500).json({message : "failed to get hindi old song"})
    }
}
