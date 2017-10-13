import * as React from 'react';
import Home from './Home';
import SearchTrendsForm from './SearchTrendsForm';

const Main = (): JSX.Element => (
    <div>
        {/* <Home message='Twitter Hash Riot' author='Gnanesh' /> */}
        <SearchTrendsForm />
    </div>
);

export default Main;
