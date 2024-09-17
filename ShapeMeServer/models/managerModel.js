const mongoose = require('mongoose');


const manager_schema = mongoose.Schema({
    manager_name:{
        type: String,
        // required: true,
    },
    manager_last_name:{
        type: String,
        // required: true,
    },
    manager_email:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique:true
    },
    manager_password:{
        type:String,
        required:true,
        min:5,
    },
    role: {
        type:String
    },
    token: { type:Object }
}
,{timestamps:true}
)



module.exports = mongoose.model("Managers", manager_schema)