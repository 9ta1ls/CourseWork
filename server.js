const express = require('express');
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const path = require("path");


//ROUTES
const deckRoute = require("./back/routes/deckRoutes");
const cardRoute = require("./back/routes/cardRoutes");


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");

app.use("/Decks", deckRoute);
app.use("/Cards", cardRoute);


app.listen(port,() => {
    console.log(`Сервер запущено на порті ${port}`); 

    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb+srv://9ta1ls:coursework123@cluster1.bulcqtr.mongodb.net/cardsapp', {
        useNewUrlParser: true, useUnifiedTopology: true } , ()=>{
        console.log("connected");
    });
})


