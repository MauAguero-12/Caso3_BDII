import * as express from 'express';
import { Logger } from '../common'
import { ArticleController } from '../controllers'

const app = express();
const log = new Logger();

app.get("/expira", (req, res,next) => {
    ArticleController.getInstance().eliminar()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        log.error(err);
        return "";
    });

});

export { app as expiraArticlesrouter };