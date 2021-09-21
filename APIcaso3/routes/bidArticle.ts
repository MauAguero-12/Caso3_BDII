import * as express from 'express';
import { Logger } from '../common'
import { ArticleController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/bid", (req, res,next) => {
    ArticleController.getInstance().ofertarArticulos()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        log.error(err);
        return "";
    });

});

export { app as bidArticles };