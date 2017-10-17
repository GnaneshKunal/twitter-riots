import * as React from 'react';
import Home from './Home';
import SearchTrendsForm from './SearchTrendsForm';

import Map from './Map';
import Map2 from './Map2';

import TrendsMap from './TrendsMap';

const Main = (): JSX.Element => (
    <div>
        <Map />
       {/*<Map2 />*/}
       {/*<TrendsMap />*/}
        <SearchTrendsForm />
    </div>
);

export default Main;
