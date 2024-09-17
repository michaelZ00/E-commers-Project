const mongoose = require('mongoose');


const category_schema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    }
}
,{timestamps:true}
)



module.exports = mongoose.model("Category", category_schema)