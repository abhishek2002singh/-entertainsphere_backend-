const mongoose = require("mongoose")

const databaseConnection = async()=>{
    console.log(process.env.DATABASE_URL)
     await mongoose.connect(process.env.DATABASE_URL);
}

module.exports = databaseConnection