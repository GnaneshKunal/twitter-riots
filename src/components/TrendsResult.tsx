import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

interface searchDataSchema {
    name: string,
    query: string,
    url: string
}

interface ISearchDataProps {
    searchData: Array<searchDataSchema>
}

export default class Home extends React.Component<ISearchDataProps, {}> {

    public render(): JSX.Element {
        return (
            <div> 

                <div className="list-group">
                    {this.props.searchData.map(x => {

                        return <Link to={`/tweets/${x.query}`} className="list-group-item list-group-item-action" id={x.name}>{x.name}</Link>
                    })}
                </div>
            
            </div>

        );
    }
}

