const express = require("express");
const ProductModel  = require ("../model/productModel");
const { getToken } = require("../util.js");

const route = express.Router();

route.get("/", async(req, res) => {
   const products = await ProductModel.find({});
   res.send(products)
})

route.post("/", async(req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,      
    })

    const newProduct = await product.save();
    if(newProduct) {
       return res.status(201).send({message:'New Product Creates', data: newProduct})
    }
    return res.status(500).send({message: "Error in Creating product!"})
})


module.exports = route