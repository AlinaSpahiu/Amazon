const { JsonWebTokenError } = require("jsonwebtoken")

const jwt = require("jsonwebtoken");


const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, 'somethingelsesecret', {
        expiresIn: '48h'
    })
}

const isAuth = (req, res, next) =>{
    const token =req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length)
        jwt.verify(onlyToken, process.env.JWT_SECRET || 'somethingsecret',(err, decode) =>{
            if(err){
                return res.status(401).send({msg: 'Invalid Token!'})
            }
            req.user =token;
            next()
            return
        } )
    }
    return res.status(401).send({msg: "Token is not suplied."})
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next()
    }
    return res.status(401).send({msg: "Admin token is not valid."})
}

module.exports= {getToken, isAuth, isAdmin};