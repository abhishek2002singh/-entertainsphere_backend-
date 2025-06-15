const HindiNewSong = require('../../models/song/hindiNewSong')

exports.postHindiNewSong = async (req , res)=>{
    try{
        const {title , description ,thumbnail , songUrl} = req.body

        if(!title || !description || !thumbnail || !songUrl){
             return res.status(500).json({message : "all fill required to fill"})
        }

        const hindiNewSong = new HindiNewSong({
            title , 
            description ,
            thumbnail , 
            songUrl
        })

        await hindiNewSong.save()

        rres.status(201).json({message:"hindi new song added successfully" , bhojpuriSong})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"hindi new songh not upload please try again  "+error})
    }
}

exports.getHindiNewSong = async (req , res)=>{
    try{

        const hindiNewSong = HindiNewSong.find()
        res.status(200).json({ message: "bhojpuri sonng fetched successfully", bhojpuriSong });

    }catch(error){
        console.log(error)
        res.status(500).json({message:"hindi new songh not upload please try again  "+error})
    }
}