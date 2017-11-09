import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as queryString from 'query-string';

import { 
    BarChart,
    BarChartProps,
    CartesianGrid,
    XAxis,
    XAxisProps,
    YAxis,
    YAxisProps,
    Tooltip,
    Legend,
    Bar
 } from 'recharts';

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

        let style = '';
        if (this.props.tweet.sentiment === 0) {
            style = 'blue';
        } else if (this.props.tweet.sentiment > 0) {
            style = 'green';
        } else {
            style = 'red';
        }

        let data = [
            {name: 'pos', pos: this.props.tweet.pos},
            {name: 'neu', neu: this.props.tweet.neu},
            {name: 'neg', neg: this.props.tweet.neg},
            {name: 'total', total: Number(this.props.tweet.tweetData.length) }
        ]
            return (
                <div>
                    <div>
                        <h3>Positive tweets: <span style={{color: 'green'}}>{this.props.tweet.pos}</span></h3>
                        <h3>Neutral tweets: <span style={{color: 'blue'}}>{this.props.tweet.neu}</span></h3>
                        <h3>Negative tweets: <span style={{color: 'red'}}>{this.props.tweet.neg}</span></h3>
                        <h3>Total sentiment: <span style={{color: style }}>{this.props.tweet.sentiment}</span></h3>
                    </div>
                    <BarChart width={730} height={250} data={data}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="sentiment" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pos" fill="#00ff00" />
                        <Bar dataKey="neu" fill="#0000ff" />
                        <Bar dataKey="neg" fill="#ff0000" />
                        <Bar dataKey="total" fill="#000000" />
                    </BarChart>

                    <HashMap data={this.props.tweet.tweetData} params={parsed}/>
                    <div className="list-group">
                        {this.props.tweet.tweetData.map(x => {
                            let style = '';
                                if (x.sentiment === 'POSITIVE')
                                    style = 'success';
                                else if (x.sentiment === 'NEUTRAL')
                                    style = 'info';
                                else 
                                    style = 'danger';
                            return (
                                <div className={`card text-white bg-${style} mb-3`} style={{"max-width": "100%"}}>
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