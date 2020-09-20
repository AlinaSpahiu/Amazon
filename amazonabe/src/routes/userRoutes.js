const express = require("express");
const UserModel  = require ("../model/userModel.js");
const { getToken } = require("../util");

const route = express.Router();


// signin Route:
route.post("/signin", async(req, res) =>{
    const singinUser = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
     if(singinUser){
         res.send({
             _id: singinUser.id,
             name: singinUser.name,
             email: singinUser.email,
             isAdmin: singinUser.isAdmin,

             token: getToken(singinUser),
         })
     } else{
         res.status(401).send({msg: "Invalid Email or Password"})
     }
})


// register Route:
route.post("/register", async(req, res) =>{
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
          })
     } else {  res.status(401).send({msg: "Invalid User Data"}) }
})


// route for admin
route.get("/createadmin", async(req, res) => {
    
    try{

        const user = new UserModel({
            name: "Alina",
            email:"alina.s.abbaz@gmail.com",
            password: "1234",
            isAdmin: true
        })
        const newUser = await user.save();
        res.send(user)
    
    
    }catch(error){ res.send({msg: error.mesagge}) }
})

module.exports = route