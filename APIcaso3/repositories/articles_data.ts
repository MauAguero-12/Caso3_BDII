import { Logger } from '../common'
require('./conexion'); //importa el archivo de conexion

// se creara las 4 funciones solicitadas
//se accede a una nueva conexion...

export class subasta_articulos {
    private log: Logger;

    public constructor()
    {
    }

    //función de agregar un nuevo articulo a la subasta
    public addArticles() : Promise<any>
    {
        return null;
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