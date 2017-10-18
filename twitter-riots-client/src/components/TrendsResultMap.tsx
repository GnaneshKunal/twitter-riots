import { compose, withProps, withStateHandlers } from "recompose";
// import { FaAnchor } from "react-icons";
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


class TrendsResultMap extends React.Component<any, any> {

    constructor(props) {
        super(props);

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
            defaultCenter={{ lat: parseFloat(this.props.geo.lat), lng: parseFloat(this.props.geo.long) }}
        >
            <Marker
                position={{ lat: parseFloat(this.props.geo.lat), lng: parseFloat(this.props.geo.long) }}
                onClick={props.onToggleOpen}
            >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                    <h3><center> Nearest Trends: <b>{this.props.geo.location}</b></center></h3>
                </div>
            </InfoWindow>}
            </Marker>
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

export default TrendsResultMap;
