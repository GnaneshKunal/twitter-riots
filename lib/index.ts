import * as express from 'express';
import * as twit from 'twit';
import axios from 'axios';
import * as AxiosTypes from 'axios';
import * as xml2js from 'xml2js';

const router: express.Router = express.Router();

import { Twitter } from '../';

router.get('/trends/place', (req: express.Request, res: express.Response): void | any => {
    let location = req.query.place;
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22${location}%22&appid=49b44e61ea5af9b80a3b3cf9b3ace7a4a0f5924a`)
    .then(resAxios => {
        let xml = resAxios.data;
        xml2js.parseString(xml, (err: Error, resXML: any) => {
            if (err)
                console.log(err);
            else {
                
                let woeid = resXML.query.results[0].place[0].woeid[0];
                if (woeid === undefined || woeid === null) {
                    console.log('Bad location');
                } else {
                    location = woeid.trim();
                    console.log(location);
                    Twitter.get('trends/place', {
                        id: '1'
                    }, (err: Error, data: twit.Response) => {
                        if (err)
                            throw err;
                        return res.send(data);
                    });
                }
            }
        })
    })
    .catch(err => {
        console.log(err.response);
    });
});

export default router;