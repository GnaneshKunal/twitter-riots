import * as React from 'react';
import { connect } from 'react-redux';

interface IHomeProps {
    search: Boolean;
    data: String;
}

export default class Home extends React.Component<IHomeProps, {}> {

    public render(): JSX.Element {
        return (
            <div> You have searched {this.props.search} </div>
        );
        // if (this.props.search) {
        //     return (
        //         <div>
        //              by {this.props.data}
        //         </div>
        //     );
        // } else
        //     return (
        //         <div>
        //             Please ENter Something
        //         </div>
        //     )
    }
}

