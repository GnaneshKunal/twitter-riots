import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as queryString from 'query-string';

import * as actions from '../actions';

interface IHashTagTweets {
    tweet: {
        tweetData: Array<any>
    },
    getTrendingTweets: Function,
    match: {
        params: {
            hash: string
        }   
    }
    location: {
        search: string
    }
}

interface ITweetData {
    id: Array<object>
}

class HashTagTweets extends React.Component<IHashTagTweets, {}> {

    constructor(props: any) {
        super(props);

        this.props.getTrendingTweets(this.props.match.params.hash);
    }


    renderPage(): JSX.Element {
        const parsed = queryString.parse(this.props.location.search)
        if (this.props.tweet.tweetData !== null && this.props.tweet.tweetData !== undefined) {
            return (
                <div>
                    <div className="list-group">
                        {this.props.tweet.tweetData.map(x => {
                            for (var key in x) {
                                return (
                                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                                        <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{key}</h5>
                                        <small className="text-muted">{x[key].sentiment}</small>
                                        </div>
                                        <p className="mb-1">{x[key].tweet}</p>
                                        <small className="text-muted">{x[key].user.name} ({x[key].user.screenName})</small>
                                    </a>
                                )   
                            }
                        })}
                    </div>
                </div>
            )
        } else
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



    public render(): JSX.Element {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}


const mapStateToProps = (state: any) => state;

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
      getTrendingTweets: (tweet: string) => dispatch<any>(actions.getTrendingTweets(tweet))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HashTagTweets);