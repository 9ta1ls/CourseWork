const {sign, verify} = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user)=>{
    const accessToken = sign({id: user._id}, process.env.JWT_SECRET);
    return accessToken;
};

const validateToken = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken){
        return res.status(400).redirect('/api/login');
    }
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    
    if(!validToken) {
        return res.redirect('/api/login');
    }    
    return next();
};

const validateTokenForLogged = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(accessToken){
        return res.redirect('/decks');
    } 
    return next();
};

module.exports= {
    createToken,
    validateToken,
    validateTokenForLogged
};