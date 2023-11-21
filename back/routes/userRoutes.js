const express = require("express");
const router  = express.Router();
const path = require("path");
const mongoose = require("mongoose");


const userModel = require("../models/user");

const usersController = require("../controllers/usersController");

router.get("/login", usersController.showLoginPage);

router.get("/signup",usersController.showSignupPage);

router.post("/signup",usersController.createUser);

router.post("/login",usersController.loginIntoUser);

module.exports = router;