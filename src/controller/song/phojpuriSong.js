const BhojpuriSong = require('../../models/song/bhojpuriSong')

exports.postBhojpuriSong = async (req , res)=>{
    try{
         const {title , description ,thumbnail ,bhojpurisongUrl} = req.body

          if(!title || !description || !thumbnail || !bhojpurisongUrl){
              return res.status(400).json({message:"Please fill all the fields"})
          }

          const bhojpuriSong = new BhojpuriSong({
              title , 
              description ,
              thumbnail ,
              bhojpurisongUrl
          })
           await bhojpuriSong.save()
           res.status(201).json({message:"bhojpuri song added successfully" , bhojpuriSong})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"hindi movies not upload please try again  "+error})

    }
  
}


exports.getBhojpuriSong = async (req , res) =>{
    try {
        const bhojpuriSong = await BhojpuriSong.find();
        res.status(200).json({ message: "bhojpuri sonng fetched successfully", bhojpuriSong });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}