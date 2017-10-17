import * as React from 'react';
import { Link } from 'react-router-dom';

import TrendsResultMap from './TrendsResultMap';

interface searchDataSchema {
    name: string,
    query: string,
    url: string
}

interface ISearchDataProps {
    searchData: Array<searchDataSchema>,
    geo: {
        lat: Number,
        long: Number,
        woeid: Number,
        location: String
    }
}

export default class Home extends React.Component<ISearchDataProps, {}> {

    public render(): JSX.Element {
        return (
            <div> 
                <h3><center> Nearest Trends: <b>{this.props.geo.location}</b></center></h3>
                <TrendsResultMap />
                <div className="list-group">
                    {this.props.searchData.map(x => {
                        return <Link to={`/tweets/${x.query}?lat=${this.props.geo.lat}&long=${this.props.geo.long}&woeid=${this.props.geo.woeid}`} className="list-group-item list-group-item-action" id={x.name}>{x.name}</Link>
                    })}
                </div>
            
            </div>

        );
    }
}

