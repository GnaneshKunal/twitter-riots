import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import * as actions from '../actions';

import TrendsResult from './TrendsResult';

interface ITrendsProps {
    search: {
        search: Boolean,
        data: Array<any>
    }
    searchError: Function,
    shout: Function,
    trends: Function,
    value: String,
    state: any
}

class Trends extends React.Component<ITrendsProps, any> {
    onFormSubmit(event: any) {
        event.preventDefault();
        var search: String = "this.refs.search.value;";
        this.props.trends({
            search
        });
    }
    renderAlert() {
        if (this.props.search && this.props.search.data !== undefined && this.props.search.data.length > 0) {
            return(
                <div className="alert alert-danger">
                    <strong>{this.props.search.data[0].locations[0].name}</strong>
                </div>
            );
        }
    }

    renderResult() {
        if (this.props.search && this.props.search.data !== undefined && this.props.search.data.length > 0) {
            return (
                <TrendsResult search={this.props.search.data[0].locations[0].name} data={"DSA"} />
            );
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                <fieldset className="form-group">
                    <label>Search</label>
                    <input ref="search"
                    name="search" className="form-control" 
                    placeholder="search" type="text" />
                </fieldset>
                {/* {this.renderAlert()} */}
                {this.renderResult()}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
                
            </div>
        );
    }
}

const mapStateToProps = (state: any) => state;

export function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
      trends: (search: String) => dispatch(actions.trends(search))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Trends);