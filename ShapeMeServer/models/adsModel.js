const mongoose = require('mongoose');


const ads_schema = mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Ad:{
        type:String,
        require:true
    },
    cloudinary:{
        type:String
    },
}
,{timestamps:true}
)



module.exports = mongoose.model("Ads", ads_schema)