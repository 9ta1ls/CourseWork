const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const deckSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    cards: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('decks', deckSchema);