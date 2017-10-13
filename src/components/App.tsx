import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import Tweets from './HashTagTweets';
import Header from './Header';

const App = (): JSX.Element  => (
    <div>
        {/* Header Here */}
        <Header />
        <main>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/tweets/:hash' component={Tweets} />
            </Switch>
        </main>
    </div>
);

export default App;
