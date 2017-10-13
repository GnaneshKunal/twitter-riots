import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            <Link to="/trends">Trends</Link>
            <Link to="/">Home</Link>
        </div>
    );
}