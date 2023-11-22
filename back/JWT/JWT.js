const {sign, verify} = require('jsonwebtoken');

const createToken = (user)=>{
    const accessToken = sign({id: user._id}, "secretThatINeedToChange");
    return accessToken;
};

const validateToken = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if(!accessToken) 
        return res.redirect('/api/login');
    const validToken = verify(accessToken,"secretThatINeedToChange");
    if(!validToken)     
        return res.redirect('/api/login');
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