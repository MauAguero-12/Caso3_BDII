import { subasta_articulos } from '../repositories/articles_data'
import { Logger } from '../common'

//en este documento se crearán algunos métodos que llamaran a las funciones planteadas para el caso

export class ArticleController {
    private static instance: ArticleController;
    private log: Logger;

    private constructor()
    {
        this.log = new Logger();
        try
        {
        } catch (e)
        {
            this.log.error(e);
        }
    }

    public static getInstance() : ArticleController
    {
        if (!this.instance)
        {
            this.instance = new ArticleController();
        }
        return this.instance;
    }

    //desde el controlador se llama a la función para mostrar articulos
    public listar() : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.allArticles();
    }

    //desde el controlador se llama a la función para agregar articulos
    public Agregar(req,res) : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.addArticles( req,res);
    }

    //desde el controlador se llama a la función para dar de baja un articulo antes de tiempo
    public eliminar(req,res) : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.downArticle(req,res);
    }

    //desde el controlador se llama a la función para dar de baja un articulo antes de tiempo
    public expira(res) : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.expiraArticle(res);
    }

    //desde el controlador se llama a la función para listar los articulos
    public listarArticulos() : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.listArticles();
    }

    //desde el controlador se llama a la función para ofertar un articulo
    public ofertarArticulos() : Promise<any> 
    {
        const article = new subasta_articulos();
        return article.offerArticles();
    }
}