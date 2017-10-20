import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as queryString from 'query-string';

import * as actions from '../actions';

import HashMap from './HashMap';

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
                    <HashMap data={this.props.tweet.tweetData}/>
                    <div className="list-group">
                        {this.props.tweet.tweetData.map(x => {
                            let style = '';
                            if (x.sentiment < 0)
                                style = 'danger';
                            else if (x.sentiment === 0)
                                style = 'info';
                            else
                                style = 'success';
                            return (
                                <div className={`card text-white bg-${style} mb-3`} style={{"max-width": "100%"}}>
                                    {/*<div className="card-header">Header</div>*/}
                                    <div className="card-body">
                                        <h4 className="card-title">{x.user.name} | @{x.user.screenName} | {x.id} | {x.sentiment}</h4>
                                        <p className="card-text">{x.tweet}</p>
                                    </div>
                                </div>
                            )
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