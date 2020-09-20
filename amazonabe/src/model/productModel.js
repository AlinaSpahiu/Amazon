const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name:         { type: String, required: true},
    image:        { type: String, required: true},
    brand:        { type: String, required: true},
    price:        { type: Number, default: 0 , required: true},
    category:     { type: String, required: true},
    countInStock: { type: Number, required: true, default: 0},
    description:  { type: String, required: true},
    rating:       { type: Number, required: true, default: 0},
    numReviews:   { type: Number, required: true, default: 0},
})

const productModel = mongoose.model("Product", productSchema);

module.exports= productModel;