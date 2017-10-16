import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../actions';

import TrendsResult from './TrendsResult';

interface ISearchTrendsProps {
    search: {
        search: Boolean,
        data: Array<any>,
        searchData: Array<any>
    }
    searchError: Function,
    shout: Function,
    trends: Function,
    value: string,
    state: any
}

interface ISearchTrendsState {
    location: string,
    search: {
        click: Boolean
    },
    redirect: boolean
}

class SearchTrendsForm extends React.Component<ISearchTrendsProps, ISearchTrendsState> {

    constructor(props: any) {
        super(props);

        this.state = {
            location: '',
            search: {
                click: false
            },
            redirect: false
        };
    }

    onFormSubmit(event: any) {
        event.preventDefault();
        this.setState({ search: { click : true }, redirect: true /*, page: 'trends'*/ })
    }


    renderForm(): JSX.Element {
        return (
            <div className="container" style={{"margin-left": "30%", "margin-top": "20%"}}>
                <div className="row clearfix">
                    <div className="col-md-12 column">
                    <div className="col-md-6 col-md-offset-3 column">
                        <form role="form" onSubmit={this.onFormSubmit.bind(this)}>
                            <div className="form-group">
                                <label className="h1" style={{"padding-left": "30%"}}>Location</label>
                                <input type="text" 
                                    name="search" className="form-control text-center"
                                    value={this.state.location}
                                    placeholder="location"
                                    onChange={event => this.setState({ location: event.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <div className="col-md-6 text-center"> 
                                    <button id="singlebutton" style={{"padding": "10px 92% 10px 92% ", "text-align": "center"}} className="btn btn-primary">Search</button> 
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    
    public render(): JSX.Element {
        const { redirect } = this.state;
        if (redirect)
            return <Redirect push to={`/trends/${this.state.location}`} />
        else
            return (
                <div>
                    {this.renderForm()}
                </div>
            )
    }
}

export default SearchTrendsForm;