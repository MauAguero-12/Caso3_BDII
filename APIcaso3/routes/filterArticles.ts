import * as express from 'express';
import { Logger } from '../common'
import { ArticleController } from '../controllers'

const app = express();
const log = new Logger();

app.post("/filter", (req, res) => {
    ArticleController.getInstance().listarArticulos(req,res)
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        log.error(err);
        return "";
    });

});

export { app as filterArticles };