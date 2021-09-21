import * as express from 'express';
import { Logger } from '../common'
import { ArticleController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/add", (req, res,next) => {
    ArticleController.getInstance().Agregar()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        log.error(err);
        return "";
    });

});

export { app as addArticlesrouter };