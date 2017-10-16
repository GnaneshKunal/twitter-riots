import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions';
import TrendsResult from './TrendsResult';
import * as _ from 'lodash';

interface ITrends {
    name: string,
    query: string,
    url: string,
    locationTrends: Function,
    cacheGeo: Function,
    match: {
        params: {
            location: string
        }
    },
    search: {
        trendsData: {
            tweets: any,
            geo: {
                lat: Number,
                long: Number,
                woeid: Number
            }
        }
    }
}

class Trends extends React.Component<ITrends, {}> {

    constructor(props) {
        super(props);

        this.props.locationTrends({
            search: this.props.match.params.location
        });
    }

    public render(): JSX.Element {
        if (this.props.search.trendsData !== null && this.props.search.trendsData !== undefined) {
            this.props.cacheGeo(this.props.search.trendsData.geo);
            return (
                <TrendsResult searchData={this.props.search.trendsData.tweets} geo={this.props.search.trendsData.geo}/>
            )

        } else {
            return (
                <div className="container" style={{"margin-left": "30%", "margin-top": "20%"}}>
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <div className="col-md-6 col-md-offset-3 column">
                                <h1>Loading</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
    }
}

const mapStateToProps = (state: any) => state;

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
      locationTrends: (search: {search: string}) => dispatch<any>(actions.locationTrends(search)),
      cacheGeo: (geo: actions.geo) => dispatch<any>(actions.cacheGeo(geo))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Trends);