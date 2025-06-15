const SouthMovies = require('../../models/movies/southMovies');

exports.postSouthMovies = async (req, res) => {
    try {
        const { title, description, thumbnail, videoUrl } = req.body;
        if (!title || !description || !thumbnail || !videoUrl) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const southMovies = new SouthMovies({
            title,
            description,
            thumbnail,
            videoUrl
        });
        await southMovies.save();
        res.status(201).json({ message: "South Movies added successfully", southMovies });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "South movies not upload please try again  " + error })
    }
}

exports.getSouthMovies = async (req, res) => {
    try {
        const southMovies = await SouthMovies.find();
        res.status(200).json({ message: "South Movies fetched successfully", southMovies });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}