import * as React from 'react';
import { connect } from 'react-redux';

interface IHomeProps {
    search: Boolean;
    data: String;
}

export default class Home extends React.Component<IHomeProps, {}> {

    public render(): JSX.Element {
        return (
            <div> You have searched {this.props.search} 

                <ul className="list-group">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            
            </div>

        );
    }
}

