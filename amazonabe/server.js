const express = require("express");
const data = require ("./data")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const userRoute = require("./src/routes/userRoutes")
const productRoute = require("./src/routes/productRoute")
const config = require("./config")
dotenv.config();
const cors = require("cors")


mongoose.connect(MONGODB_URL =  process.env.MONGODB_URL || 'mongodb://localhost/amazona',  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason))

const server = express();
server.use(cors())

server.use(bodyParser.json())

server.use("/api/users/", userRoute)
server.use("/api/products", productRoute)
server.get("/api/products", productRoute)




// server.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find( x => x._id === productId)
//     if(product)
//     res.send(product);
//     else res.status(404).send(msg,"Product not found!")
// });


server.listen(config.PORT, () =>{ console.log("Server started at: http://localhost:3001")})