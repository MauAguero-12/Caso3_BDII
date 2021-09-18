//NOTAS: EL SERVIDOR DE MONGO SE LLAMA mongoservercaso3: docker run -d --name mongoservercaso3 mongo
// - se entra a la consola con -> docker exec -it mongoservercaso3 bash
// - la consola se llama -> mongo


const mongoose = require('mongoose');
// colocamos el URL de conexión local y el nombre de nuestra base de datos
mongoose.connect('mongodb://localhost:27017/caso3');


//para comprobar que la conexion se realizó exitosamente:
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});


//se define el schema
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

const bids = mongoose.model('bids',
{
    bidArticleID: Number,   //para identificar cual articulo es
    bidder: String,         //nombre del ofertador
    amount: Number,         //cantidad que oferta en la subasta
    bidDate: Date

})