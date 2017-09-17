import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as dotenv from 'dotenv';
import * as morgan from 'morgan';

import * as twitRouter from './lib/index';

dotenv.config();

const PORT: string | number = process.env.PORT || 8080;

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.mountRoutes();
    }

    private mountRoutes(): void {
        const router: express.Router = express.Router();
        this.express.use(morgan('tiny'));
        this.express.use(express.static('.'));
        router.get(['/', '/trends'], (_, res: express.Response) => {
            return res.sendFile(path.join( __dirname, '../index.html'));
        });
        this.express.use('/', router);
        this.express.use('/api', twitRouter.default);
    }
}

const app: express.Application = new App().express;
const server: http.Server = http.createServer(app);

server.listen(PORT, (err: Error): void | never => {
    if (err) {
        throw err;
    }
    /* tslint:disable */ 
    return console.log('Server listening on PORT: ' + PORT);
    /* tslint:enable */
});
