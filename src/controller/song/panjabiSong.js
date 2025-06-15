const PanjabiSong = require('../../models/song/panjabiSong')

exports.postPanjabiSong = async (req , res)=>{
    try{
          const {title ,description ,thumbnail ,songUrl} = req.body

           if( !title || !description || !thumbnail || !songUrl)
           {
               return res.status(400).json({message:"Please fill all the fields"})
           }

           const panjabiSong = new PanjabiSong({
               title ,
               description ,
               thumbnail ,
               songUrl,
               userId: req.accessUser?._id 
       
           })

           await panjabiSong.save();

           }catch(error){
               console.error(error)
               res.status(501).json({ message :"not add panjabi song"})
           }
    
}

exports.getPanjabiSong = async (req ,res) =>{
    try{
        const userId = req.accessUser?._id
        if(userId){
            res.status(401).json({ message: "user not login"})
        }
        const panjabiSong = await PanjabiSong.find()
        res.status(201).json({message : "all panjabi song get "})

    }catch(error){
        console.error(error)
        res.status(501).json({message :"not get song panjabi"})
    }
}