const deckModel = require("../models/deck");
const userModel = require('../models/user');
const {verify} = require('jsonwebtoken');


function returnUserId(req){
    const accessToken = req.cookies["access-token"];
    const decoded = verify(accessToken,'secretThatINeedToChange');
    return decoded.id;
};

async function isDeckInUser(req, res, deckId){
    const userId = returnUserId(req);
    const user = await userModel.findById(userId);
    return user.decks.includes(deckId);
};


const showCards = async (req, res) => {
    const deckId = req.params.id;
    if(isDeckInUser(req, res, deckId) == false){
        console.log('a');
        res.statusCode(400);
    }
    const deckWithCards = await deckModel.findById(deckId);
    const name = deckWithCards.name;
    const cardsArr = deckWithCards.cards;
    res.render("cardsEjs", {cardsArr:cardsArr ,deckName:name, deck:deckWithCards, deckId: deckId});
};

const postCard = async (req, res) =>{
    const newQuestion = req.body.question;
    const newAnswer = req.body.answer;
    const newCard = {
        question: newQuestion,
        answer: newAnswer
    }
    const deckId = req.params.id;
    if(!isDeckInUser(req, res, deckId)){
        res.redirect('/decks')
    }
     deckModel.findById(deckId, async(err, deck) => {
        if(err)
            return err;
        await deck.cards.push(newCard);
        await deck.save();
    })
    setTimeout(() => {
        res.redirect(`/cards/${deckId}`);
    }, 100);
}

const deleteCard = async(req, res)=>{
    const deckId = req.params.id;
    if(!isDeckInUser(req, res, deckId)){
        res.redirect('/decks')
    }
    const cardId = req.params.cardId;
    deckModel.updateOne(  
        { _id: deckId },
        { $pull: { cards: { _id: cardId } } },
        (err, result) => {
        }
    )
    res.status(200).send();
}


const loadLearingPage = async(req, res)=>{
    const deckId = req.params.id;
    if(!isDeckInUser(req, res, deckId)){
        res.redirect('/decks')
    }
    const deckWithCards = await deckModel.findById(deckId);
    const cardsArr = deckWithCards.cards;
    const cardsArrJson = JSON.stringify(cardsArr);
    res.render("learningEjs",{deckId: deckId, cardsArr: cardsArr, cardsArrJson: cardsArrJson});
}




module.exports = {
    showCards,
    postCard,
    deleteCard,
    loadLearingPage
};