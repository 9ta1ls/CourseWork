const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");

const validation = require('../JWT/JWT');

const usersController = require("../controllers/usersController");

router.get("/login",validation.validateTokenForLogged, usersController.showLoginPage);

router.get("/signup",validation.validateTokenForLogged, usersController.showSignupPage);

router.post("/signup",validation.validateTokenForLogged, usersController.createUser);

router.post("/login",validation.validateTokenForLogged, usersController.loginIntoUser);

module.exports = router;