const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/caso3');


const articulos = mongoose.model('caso3', 
{
    owner: String,
    ownerEmail: String,
    year: Number,
    name: String,
    description: String,
    pictureURL: String,
    initialPrice: String,
    endDate: Date,
    bids: [{
        bidder: String,
        amount: Number
    }],
    active: Boolean
})