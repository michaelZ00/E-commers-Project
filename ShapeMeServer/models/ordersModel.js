const mongoose = require("mongoose");

const order_schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: true,
    },
    order_number: {
      type: String,
      required: false,
    },

    products: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    customer_details: {
      name: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        trim: true,
        required: true,
      },
      city: {
        type: String,
        trim: true,
        required: true,
      },
      phone:{
        type:String,
        require:true
      },
      notes: {
        type: String,
        trim: true,
      },
    },
    total_price: {
      type: Number,
      min: 1,
    },

    order_status: {
      type: Number,
      default: 0,
      min: [0, "minimom 0"],
      max: [4, "max 4"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", order_schema);
