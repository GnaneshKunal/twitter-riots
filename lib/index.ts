import * as express from 'express';
import * as twit from 'twit';

const router: express.Router = express.Router();

import { Twitter } from '../';


router.get('/trends/place', (_, res: express.Response): void | any => {
    Twitter.get('trends/place', {
        id: '2487956'
    }, (err: Error, data: twit.Response) => {
        if (err)
            throw err;
        //     res.write("Twitter");
        // res.end("");
        return res.send(data);
    });
});

export default router;