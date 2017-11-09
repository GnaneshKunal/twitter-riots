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
    min: -0.00028,
    max: 0.00028
})


class HashMap extends React.Component<any, any> {

    constructor(props) {
        super(props);
        
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
 //           defaultCenter={{ lat: 13.21028, lng: 79.089638 }}
            defaultCenter={{ lat: Number(this.props.params.lat), lng: Number(this.props.params.long) }}
        >
            {this.props.data.map(x => {
                var i = 0;
                let icon;
                if (x.sentiment === 'POSITIVE') {
                    icon = 'http://individual.icons-land.com/IconsPreview/Sport/PNG/16x16/Ball_Green.png';
                } else if (x.sentiment === 'NEUTRAL') {
                    icon = 'http://findicons.com/files/icons/129/soft_scraps/16/button_blank_blue_01.png';
                } else {
                    icon = 'http://findicons.com/files/icons/2583/sweetieplus/16/circle_red_16_ns.png';
                }

                let min = -0.00008;
                let max = 0.01128

                let lat = x.user.latLong.lat
                let long = x.user.latLong.long

                lat = (lat !== 0 || "") ? lat : Number(this.props.params.lat + Math.floor(Math.random() * (0.00028 - -0.00028)) + (-0.00028))
                long = (long !== 0 || "") ? long : Number(this.props.params.long + Math.floor(Math.random() * (0.00028 - -0.00028)) + (-0.00028))
                    return (
                        <Marker
                        icon={{
                            height: 10,
                            width: 10,
                            url: icon
                        }}
                            position={{ lat: lat, lng: long }}
                            onClick={props.onToggleOpen}
                        >
                        {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                            <div>
                                <div>
                                    <h6>{x.user.name} | @{x.user.screenName} | {x.id} | {x.sentiment}</h6>
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
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            />
    </div>
        )
    }
}

export default HashMap;
