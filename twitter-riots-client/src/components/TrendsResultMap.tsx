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

const MapWithAMarker = compose(
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
            icon={{
                height: 10,
                width: 10,
                url: 'http://findicons.com/files/icons/2583/sweetieplus/16/circle_red_16_ns.png',
            }}
            >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div>
                Controlled zoom: {props.zoom}
                </div>
            </InfoWindow>}
            </Marker>
        </GoogleMap>
        );

class TrendsResultMap extends React.Component<any, any> {
    public render(): JSX.Element {

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
