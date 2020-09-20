const express = require("express");
const ProductModel  = require ("../model/productModel.js");
const {isAuth, isAdmin} = require("../util")



const route = express.Router();

route.get("/products/", async(req, res) => {
   const products = await ProductModel.find({});
   res.send(products)
})

route.get("/products/:id", async(req, res) => {
    const product = await ProductModel.findOne({_id: req.params.id});
    if(product){
        res.send(product)
    } else {
        res.status(404).send({message:"Product not found"})
    }
    res.send(product)
 })

route.post("/", isAuth, isAdmin, async(req, res) => {
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

route.put("/:id", isAuth, isAdmin, async(req, res) => {
   
    const productId = req.params.id;
    const product = await ProductModel.findById(productId)
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
    

    const updatedroduct = await product.save();
    if(updatedroduct) {
       return res.status(200).send({message:'Product Updated', data: updatedroduct})
    }
    return res.status(500).send({message: "Error in Updating product!"})
}})

route.delete("/id", isAuth, isAdmin, async(req, res) => {
    const deletedProduct = await ProductModel.findById(req.params.id);

    if(deletedProduct){
        await deletedProduct.remove();
        res.send ({ message: "Product Deleted!"})
    } else{    res.send("Error in deleteion!")}
 
})


module.exports = route