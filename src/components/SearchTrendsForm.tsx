import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import * as actions from '../actions';

interface ISearchTrendsProps {
    search: {
        search: Boolean,
        data: Array<any>
    }
    searchError: Function,
    shout: Function,
    trends: Function,
    locationTrends: Function,
    value: String,
    state: any
}

interface ISearchTrendsState {
    location: string,
    page: string,
    search: {
        click: Boolean
    }
}

class SearchTrendsForm extends React.Component<ISearchTrendsProps, ISearchTrendsState> {

    constructor(props: any) {
        super(props);

        this.state = {
            location: '',
            page: '',
            search: {
                click: false
            }
        };
    }

    onFormSubmit(event: any) {
        event.preventDefault();
        this.props.locationTrends({
            search: this.state.location
        });
        this.setState({ search: { click : true }})
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

    

    renderPage(): JSX.Element {
        if (this.state.page === '')
            return this.renderForm()
        else if (this.state.page === 'trends') {
            return <div>Nothing</div>
        } else {
            return <div>Ultra Nothing</div>
        }
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
      locationTrends: (search: {search: string}) => dispatch<any>(actions.locationTrends(search))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SearchTrendsForm);