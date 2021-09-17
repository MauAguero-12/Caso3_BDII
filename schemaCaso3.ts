const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/caso3');


const articulos = mongoose.model('articulos', 
{
    articleID: Number,      //ID para identificar el articulo
    owner: String,          //nombre del usuario que agrega el articulo a la subasta
    ownerEmail: String,
    publicationDate: Date,  //fecha en la que se pone el articulo en subasta
    articleYear: Number,    //para indicar la antiguedad del articulo
    articleName: String,
    description: String,
    pictureURL: String,
    initialPrice: Number,
    actualPrice: Number,
    endDate: Date,          //fecha en la que termina la subasta del articulo
    active: Boolean
})

const bids = mongoose.model('pujas',
{
    bidArticleID: Number,   //para identificar cual articulo es
    bidder: String,         //nombre del ofertador
    amount: Number,         //cantidad que oferta en la subasta
    bidDate: Date

})
