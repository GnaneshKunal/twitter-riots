import { compose, withProps, withStateHandlers } from "recompose";

import * as React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  MapWithAMarkerWithLabel,
  MarkerWithLabel,
  MapWithAMakredInfoWindow,
  DirectionsRenderer,
  lifecycle
} from "react-google-maps";

import * as rn from 'random-number';

let gen = rn.generator({
    min: -0.00008,
    max: 0.01128
})


class HashMap extends React.Component<any, any> {

    constructor(props) {
        super(props);
        console.log(this);
        
        this.state = { i : 0 }

        this.MapWithAMarker = compose(
        withStateHandlers(() => ({
            isOpen: false,
        }), {
            onToggleOpen: ({ isOpen }) => () => ({
            isOpen: !isOpen,
            })
        }),
        withScriptjs,
        withGoogleMap
        )(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: 13.21028, lng: 79.089638 }}
        >
            {this.props.data.map(x => {
                var i = 0;
                let icon;
                if (x.sentiment > 0) {
                    icon = 'http://individual.icons-land.com/IconsPreview/Sport/PNG/16x16/Ball_Green.png';
                } else if (x.sentiment == 0) {
                    icon = 'http://findicons.com/files/icons/129/soft_scraps/16/button_blank_blue_01.png';
                } else {
                    icon = 'http://findicons.com/files/icons/2583/sweetieplus/16/circle_red_16_ns.png';
                }
                    {/*console.log(gen());*/}
                    return (
                        <Marker
                        icon={{
                            height: 10,
                            width: 10,
                            url: icon
                        }}
//                            position={{ lat: 13.31028 + gen() , lng: 79.189638 + gen() }}
                            position={{ lat: x.user.latLong.lat, lng: x.user.latLong.long }}
                            onClick={props.onToggleOpen}
                        >
                        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                            <div>
                                <div>
                                    <h4>{x.user.name} | @{x.user.screenName} | {x.id} | {x.sentiment}</h4>
                                    <p>{x.tweet}</p>
                                </div>
                            </div>
                        </InfoWindow>}
                        </Marker>
                    )
            })}
        </GoogleMap>
        );
    } 
    public render(): JSX.Element {
        const {MapWithAMarker} = this
        return (
                <div>
        <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmQ6a6fqOabymhahuL4xyL5--MJPuEf_g&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
    </div>
        )
    }
}

export default HashMap;
