import { Logger } from '../common';

require('../conexion')
const articulos = require('../models/modeloarticulos.ts');  //es este documento se encuentra el schema
const bids = require('../models/modelobids.ts');  //es este documento se encuentra el schema

const { response } = require('express');
const { Promise } = require('mongoose');
const {moment} = require('moment');



// se creara las 4 funciones solicitadas
//se accede a una nueva conexion...



export class subasta_articulos {
    private log: Logger;
    
    public constructor(){

    }
    
    //funcion para obtener todos los objetos de la subasta
    public allArticles(){

        const listaArticulos = articulos.find({activo:true});
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

        return articulos.findOneAndUpdate({articleName: req.body.articleName, owner: req.body.owner, active: true},{open: false} ).exec()  //se actualizan los datos del articulo, deja de ser un producto activo en la subasta
        .then(()=>{
            
            console.log('Baja del producto exitosa');

            //se asigna el producto a quien propuso mas dinero

            //averiguamos el codigo del articulo que se dio de baja en la subasta
            const id= articulos.findOne({articleName: req.body.articleName},{articleID:0,_id:0}).exec() ;
            
            //averiguamos la cantidad maxima que se ha pagado
            const maxCant=articulos.findOne({articleName: req.body.articleName},{actualPrice:0,_id:0}).exec() ;
            
            //buscamos la persona que pagaba mas por el articulo
            const ganador= bids.findOne({bidArticleID:id, amount:maxCant},{bidder:0}).exec() ;

            //se muestra quien es el ganador
            console.log('El ganador de la subasta es %s', ganador);
        
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
    public listArticles() : Promise<any>
    {
        return null;
    }

    //función de ofertar un articulo
    public offerArticles() : Promise<any>
    {
        return null;
    }

}