
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//se define el schema


const bids =  new Schema(
{
    bidArticleID: Number,   //para identificar cual articulo es
    bidder: String,         //nombre del ofertador
    amount: Number,         //cantidad que oferta en la subasta
    bidDate: Date

});

module.exports = mongoose.model('bids',bids);