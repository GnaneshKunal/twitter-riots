import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import Trends from './Trends';

const App = (): JSX.Element  => (
    <div>
        {/* Header Here */}
        <main>
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/trends' component={Trends} />
            </Switch>
        </main>
    </div>
);

export default App;
