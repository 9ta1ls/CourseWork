const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const card = require('./card');


const deckSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    cards:[{
        type: Schema.Types.ObjectId,
        ref:'card'
    }]
});

const deck = mongoose.model('decks', deckSchema);
module.exports = deck;