const mongoose = require('mongoose');


const brand_schema = mongoose.Schema({
    Name:{
        type: String,
        required: true,
        unique:true
    },
    Logo:{
        type:String,
    },
    cloudinary:{
        type:String
    },
}
,{timestamps:true}
)



module.exports = mongoose.model("Brands", brand_schema)