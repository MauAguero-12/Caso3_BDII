import { Logger } from '../common';

require('../conexion')
const articulos = require('../models/modeloarticulos.ts');  //es este documento se encuentra el schema
const bids = require('../models/modelobids.ts');  //es este documento se encuentra el schema

const { response } = require('express');
//const { Promise } = require('mongoose');
const {moment} = require('moment');



// se creara las 4 funciones solicitadas
//se accede a una nueva conexion...

export class subasta_articulos {
    private log: Logger;
    
    public constructor(){

    }
    
    //funcion para obtener todos los objetos de la subasta
    public allArticles(){

        const listaArticulos = articulos.find({active:true});
        return listaArticulos;
        
    }

    //funcion para agregar un articulo a la subasta
    public addArticles(req,res)  : Promise <any>
    {
        return articulos.find().count().exec() //para obtener el numero de elemento y registrar una id para el nuevo articulo
            .then((count: any) => {
                const nuevoArticulo = new articulos(
                    {
                        articleID: count,
                        owner: req.body.owner,
                        ownerEmail: req.body.ownerEmail,
                        publicationDate: req.body.publicationDate,
                        articleYear: req.body.articleYear,
                        articleName: req.body.articleName,
                        description: req.body.description,
                        pictureURL: req.body.pictureURL,
                        initialPrice: req.body.initialPrice,
                        actualPrice: req.body.actualPrice,
                        endDate: req.body.endDate,
                        active: true
                    });

                    console.log(nuevoArticulo);
                    nuevoArticulo.save() //se guarda(inserta) el articulo creado

                .catch((error: any) => {
                        const result = res.status(500).json({
                            error: true,
                            message: `Error: ${error}`,
                            code: 0
                        });
                    });

               
            });
    }

    //función de dar de baja un articulo antes de tiempo
    public downArticle(req, res) : Promise<any>
    {

        return articulos.findOneAndUpdate({articleName: req.body.articleName, owner: req.body.owner, active: true},{active: false} ).exec()  //se actualizan los datos del articulo, deja de ser un producto activo en la subasta
        .then(async ()=>{
            
            console.log('Baja del producto exitosa');

            //se asigna el producto a quien propuso mas dinero

            //averiguamos el codigo del articulo que se dio de baja en la subasta
            const id= await articulos.findOne({articleName: req.body.articleName},{articleID:1,_id:0}).exec() ;
            console.log(id);
            //averiguamos la cantidad maxima que se ha pagado
            const maxCant= await articulos.findOne({articleName: req.body.articleName},{actualPrice:1,_id:0}).exec() ;
            console.log(maxCant);
            //buscamos la persona que pagaba mas por el articulo
            const ganador= await bids.findOne({bidArticleID:id.articleID, amount:maxCant.actualPrice},{bidder:1,_id:0}).exec() ;
            console.log(ganador);
            //se muestra quien es el ganador
            console.log('El ganador de la subasta es %s', ganador.bidder);
        
            })
            .catch((error: any)=>{
                const result = res.status(500).json({
                    error: true,
                    message: `Server error: ${error}`,
                    code: 0
                });
            });
        }   

    //función de dar de baja un articulo porque expira
    public expiraArticle(res) : Promise<any>
    {

        return articulos.updateMany({endDate:{$gte: moment}, active:true},{$set: {active:false}}).exec() //se cierran todos los articulos que cumplieron su fecha limite en la subasta
        .then(()=>{
            const result = res.status(200).json({
            error: false,
            message: 'Actividad completado con exito->los articulos expirados se han dado de baja',
            code: 10
            })
        })
        .catch((error: any)=>{
            const result = res.status(500).json({
                error: true,
                message: `Server error: ${error}`,
                code: 0
            });
        });
    }
    




    //función de listar los artículos en subasta segun los articulos
    public listArticles(req, res) : Promise<any>
    {
        return articulos.find({active: true}).exec()
            .then(async () => {
                var filtros = {active: true,
                    articleName: {$ne: ""},
                    owner: {$ne: ""},
                    articleYear: {$ne: ""},
                    actualPrice:  {$ne: ""},
                    endDate:  {$ne: ""},
                };

                if (req.body.pArticleName == true){
                    filtros.articleName = req.body.articleName;
                }

                if (req.body.pOwner == true){
                    filtros.owner = req.body.owner;
                }

                if (req.body.pArticleYear == true){
                    filtros.articleYear = req.body.articleYear
                }

                if (req.body.pActualPrice == true){
                    filtros.actualPrice = req.body.actualPrice
                }
                
                if (req.body.pEndDate == true){
                    filtros.articleYear = req.body.endDate
                }
                
                const arrayArticulos = await articulos.find(filtros).exec()

                console.log(arrayArticulos);
                console.log();
            })
            .catch((error: any) => {
                const result = res.status(500).json({
                    error: true,
                    message: `Error: ${error}`,
                    code: 0
                });
            });
    }

    //función de ofertar un articulo
    public offerArticles(req, res) : Promise<any>
    {
        return articulos.findOne({articleName: req.body.articleName, owner: req.body.owner, actualPrice: {$lt: req.body.amount}, active:true}, {actualPrice: req.body.amount}).exec()
            .then(async () => {
                const id = await articulos.findOne({articleName: req.body.articleName, owner: req.body.owner, active: true}, {articleID:1, _id: 0}).exec();

                const cant = await articulos.findOne({articleName: req.body.articleName, owner: req.body.owner, active: true},{actualPrice:1,_id:0}).exec();

                if (cant.actualPrice < req.body.amount){
                    console.log("Entro al if");

                    const newBid = new bids(
                        {
                            bidArticleID: id.articleID,
                            bidder: req.body.bidder,
                            amount: req.body.amount,
                            bidDate: req.body.bidDate
                        }
                    );

                    console.log(newBid);
                    newBid.save();
                    articulos.findOneAndUpdate({articleName: req.body.articleName, owner: req.body.owner, actualPrice: {$lt: req.body.amount}, active:true}, {actualPrice: req.body.amount}).exec();

                    console.log("Se registro la puja");
                    console.log();
                }
                else{
                    console.log('Debe apostar un monto mayor a %d', cant.actualPrice);
                    console.log();
                }
            })
            .catch((error: any) => {
                const result = res.status(500).json({
                    error: true,
                    message: `Error: ${error}`,
                    code: 0
                });
            });
    }

}