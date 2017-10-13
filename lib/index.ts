// import * as express from 'express';
// import * as twit from 'twit';
// import axios from 'axios';
// import * as AxiosTypes from 'axios';
// import * as xml2js from 'xml2js';

// const router: express.Router = express.Router();

// import { Twitter } from '../';

// router.get('/trends/place', (req: express.Request, res: express.Response): void | any => {
//     let location = req.query.place;
//     axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22${location}%22&appid=49b44e61ea5af9b80a3b3cf9b3ace7a4a0f5924a`)
//     .then(resAxios => {
//         let xml = resAxios.data;
//         xml2js.parseString(xml, (err: Error, resXML: any) => {
//             if (err)
//                 console.log(err);
//             else {
                
//                 let woeid = resXML.query.results[0].place[0].woeid[0];
//                 if (woeid === undefined || woeid === null) {
//                     console.log('Bad location');
//                 } else {
//                     location = woeid.trim();
//                     console.log(location);
//                     Twitter.get('trends/place', {
//                         id: '1'
//                     }, (err: Error, data: any) => {
//                         console.log(data);
//                         if (err)
//                             throw err;
//                             Twitter.get('/geo/reverse_geocode.json?lat=40.71455&long=-74.258904', (err, data) => {
//                                 if (err)
//                                     throw err;
//                                 console.log(data);
//                             })
//                         return res.send(data);
//                     });
//                     // Twitter.get('trends/place', {
//                     //     id: '1'
//                     // }, (err: Error, tweets: any, response: any) => {
//                     //     console.log(tweets);
//                     // })
//                     // 'OAuth oauth_consumer_key="6t9MhFKbmetB44czvSyWyyK84",oauth_nonce="21a1abc3bf29482191f84c6ff76661c7",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1507374393",oauth_token="null",oauth_version="1.0",oauth_signature="nzMv%2Bkp96RBlw4q9FhnS8OyySSs%3D"'
//                 }
//             }
//         })
//     })
//     .catch(err => {
//         console.log(err.response);
//     });
// });

// export default router;