import { Logger } from '../common'

const { response } = require('express');
const { Promise } = require('mongoose');
const articles = require('../conexion/articulos');  //es este documento se encuentra el schema
const bids = require('../conexion/bids');  //es este documento se encuentra el schema
const moment = require('moment');
const { db } = require('../conexion');


// se creara las 4 funciones solicitadas
//se accede a una nueva conexion...



export class subasta_articulos {
    private log: Logger;
    
    public constructor(){

    }
    
    //funcion para agregar un articulo a la subasta
    public addArticles(req,res)  : Promise <any>
    {
        return articles.find().count().exec() //para obtener el numero de elemento y registrar una id para el nuevo articulo
            .then((count: any) => {
                const nuevoArticulo = new articles(
                    {
                        articleID: count,
                        owner: req.body.owner,
                        ownerEmail: req.body.ownerEmail,
                        publicationDate: moment(),
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

                .catch((error) => {
                        result = res.status(500).json({
                            error: true,
                            message: `Error: ${error}`,
                            code: 0
                        });
                    });

               
            });
    }

    //función de dar de baja un articulo
    public downArticle() : Promise<any>
    {

        return null;
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