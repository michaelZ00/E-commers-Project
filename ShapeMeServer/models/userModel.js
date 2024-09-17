const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name:{
        type: String,
        // required: true,
    },
    lastName:{
        type: String,
        // required: true,
    },
    email:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        // unique:true
    },
    address:{
        type:String,
    },
    password:{
        type:String,
    },
    phone_number:{
        type: Number,
    },
    height:{
        type: Number,
    },
    weight:{
        type: String,
    },
    bmi:{
        type: Number,
    },
    workoutInfo:{
        type:String
    },
    role: {
        type:String,
        default: "regular"
    },
    profileImage:{
        type:String,
    },
    orders:{
        type:Array
    },
    favorite:{
        type:Array
    },
    cloudinary:{
        type:String
    },
}
,{timestamps:true}
)
module.exports = mongoose.model('User',userSchema)
