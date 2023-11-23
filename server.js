const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");
const cookieParser = require('cookie-parser');

//ROUTES
const deckRoute = require("./back/routes/deckRoutes");
const cardRoute = require("./back/routes/cardRoutes");
const userRoute = require("./back/routes/userRoutes");
require('dotenv').config();


app.use(cookieParser());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");

app.use("/decks", deckRoute);
app.use("/cards", cardRoute);
app.use("/api", userRoute);



app.listen(port,() => {
    console.log(`Сервер запущено на порті ${port}`); 
    mongoose.set("strictQuery", false);
    mongoose.connect(`${process.env.DB_LINK}`, {
        useNewUrlParser: true, useUnifiedTopology: true } , ()=>{
        console.log("connected");
    });
})


