const mongoose = require('mongoose')



const productsSchema = mongoose.Schema({

    product_name:{
    type:String,

    },
    product_price:{
    type:Number
    },
    product_amount:{
        type:Number
    },
    product_brand:{
        type: mongoose.Types.ObjectId,
        require:true,
        ref: "Brands",
    },
    product_category:{
        type: mongoose.Types.ObjectId,
        require:true,
        ref: "Category",
    },
    product_pic:{
        type:String
    },
    product_type:{
        type:String
    },
    cloudinary:{
        type:String
    },
    product_discription:{
        type:String
    }
})

module.exports = mongoose.model("Products", productsSchema)