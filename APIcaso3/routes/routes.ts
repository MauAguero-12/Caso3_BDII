import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../common';
import {kindnessrouter} from './kindness';
import {addArticlesrouter} from './addArticlesrouter';
import {downArticlesrouter} from './downArticlesrouter';
import {expiraArticlesrouter} from './expiraArticulo';
import {allArticlesrouter} from './allArticles';
import {filterArticles} from './filterArticles';
import {bidArticles} from './bidArticle';


class Routes {

    public express: express.Application;
    public logger: Logger;

    constructor() {
        this.express = express();
        this.logger = new Logger();

        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        this.express.use('/add', addArticlesrouter);
        this.express.use('/down', downArticlesrouter);
        this.express.use('/expira', expiraArticlesrouter);
        this.express.use('/list', allArticlesrouter);
        this.express.use('/filter', filterArticles);
        this.express.use('/bid', bidArticles);
        this.logger.info("Kindness route loaded");
    }
}

export default new Routes().express;

