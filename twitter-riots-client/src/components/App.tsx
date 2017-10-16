import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import HashTweets from './HashTagTweets';
import Trends from './Trends';
import Header from './Header';
import { connect, Dispatch } from 'react-redux';

const App = (): JSX.Element  => (
    <div>
        {/* Header Here */}
        <Header />
        <main>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/tweets/:hash' component={HashTweets} />
                <Route exact path='/trends/:location' component={Trends} />
            </Switch>
        </main>
    </div>
);

export default App;