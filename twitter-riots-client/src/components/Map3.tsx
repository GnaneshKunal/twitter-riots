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


function createMap(lat: Number, long: Number) {

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
    defaultCenter={{ lat: lat, lng: long }}
  >

  
    <Marker
      position={{ lat: lat, lng: long }}
      onClick={props.onToggleOpen}
      icon={{
        height: 10,
        width: 10,
        url: 'http://findicons.com/files/icons/2583/sweetieplus/16/circle_red_16_ns.png',
      }}
    >
    {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        {/*<FaAnchor />*/}
        <div>
          
          {" "}
          Controlled zoom: {props.zoom}
          <br />dsa sad sad
          <br /> sadsaddas asd 
        </div>
      </InfoWindow>}
      {/*<InfoWindow onCloseClick={props.onToggleOpen}>
        <div>
          
          {" "}
          Controlled zoom: {props.zoom}
          <br />dsa sad sad
          <br /> sadsaddas asd 
        </div>
      </InfoWindow>*/}
    </Marker>
  </GoogleMap>
);

return MapWithAMarker;
}

class Map3 extends React.Component {
    public render (): JSX.Element {
        const MapWithAMarker = createMap(13.21028, 79.089638);
        return (
            <div>
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmQ6a6fqOabymhahuL4xyL5--MJPuEf_g&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
            </div>
        );
    }
}

export default Map3;
