const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//se define el schema
const articulos = new Schema({
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
});


module.exports=mongoose.model("articulos",articulos);