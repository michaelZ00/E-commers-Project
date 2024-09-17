const mongoose = require("mongoose");

const uri = process.env.MONGO_URI
// "mongodb+srv://shammai:Abcd!2345@test.id9czl5.mongodb.net/"


async function connectDb(){
    try{
        await mongoose.connect(uri)
        console.log("connected to mogodb")
    }catch(e){
        console.log(e)
        
    }
}

module.exports = connectDb