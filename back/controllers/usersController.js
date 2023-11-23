const userModel = require("../models/user")
const bcrypc = require("bcrypt");
const {createToken} = require('../JWT/JWT');

const showLoginPage = (req, res)=>{
    res.render("loginEjs.ejs");
};

const showSignupPage = (req, res)=>{
    res.render("signupEjs.ejs");
};

const createUser = async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const hashedPass = await bcrypc.hash(password, 10);
    const user = new userModel({
        username: username,
        password: hashedPass
    });
    try{
        await user.save();
        res.sendStatus(200);
    }catch(error){
       return  res.sendStatus(400);
    }
};

const loginIntoUser = async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({username: username});
    if(!user) {
        return res.status(400).send({error: "Некоректна комбінація логіну та паролю"});
    }
    const hashedPass = user.password;
    await bcrypc.compare(password, hashedPass).then((match)=>{
        if(!match){
           return  res.status(400).json({error: "Некоректна комбінація логіну та паролю"});
        }
        else{
            const accessToken = createToken(user);
            res.cookie("access-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
            });
            res.sendStatus(200);
        }
    });
};


module.exports = {
    showLoginPage,
    showSignupPage,
    createUser,
    loginIntoUser
 };