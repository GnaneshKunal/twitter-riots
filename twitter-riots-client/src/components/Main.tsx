import * as React from 'react';
import Home from './Home';
import SearchTrendsForm from './SearchTrendsForm';

import Map from './Map';
import Map2 from './Map2';
import Map3 from './Map3';

import TrendsMap from './TrendsResultMap';

const Main = (): JSX.Element => (
    <div>
        {/*<Map />*/}
        <Map3 />
       {/*<Map2 />*/}
       {/*<TrendsMap />*/}
        <SearchTrendsForm />
    </div>
);

export default Main;
