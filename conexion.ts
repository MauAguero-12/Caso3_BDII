//NOTAS: EL SERVIDOR DE MONGO SE LLAMA mongoservercaso3: docker run  -d -p 27017:27017 --name caso3 mongo
// - se entra a la consola con -> docker exec -it caso3 bash
// - la consola se llama -> mongo
/*inserto un registro en mongo-> db.articulos.save({
    "articleID": 1,
    "owner": "Jorge Ramos",
    "ownerEmail": "jorgeramos@gmail.com",
    "publicationDate": "2021-09-21",
    "articleYear": 2011,
    "articleName": "Gold Trophy",
    "description": "A very shiny golden trophy",
    "pictureURL": "https://i.imgur.com/bBjVIfL.png",
    "initialPrice": 10000,
    "actualPrice": 10000,
    "endDate": "2021-10-21",
    "active": true
});*/

//se realiza la conexion
const mongoose = require('mongoose');

// colocamos el URL de conexión local y el nombre de nuestra base de datos
mongoose.connect('mongodb://localhost:27017/caso3');


//para comprobar que la conexion se realizó exitosamente:
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});



