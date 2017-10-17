import * as React from 'react';
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  GroundOverlay,
} from "react-google-maps";

const MapWithGroundOverlay = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{lat: 40.740, lng: -74.18}}
  >
    <GroundOverlay
      url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
      bounds={new google.maps.LatLngBounds(
        new google.maps.LatLng(40.712216, -74.22655),
        new google.maps.LatLng(40.773941, -74.12544)
      )}
      defaultOpacity={.5}
    />
  </GoogleMap>
);


const TrendsMap = (): JSX.Element => (
    <div>
        <MapWithGroundOverlay
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBmQ6a6fqOabymhahuL4xyL5--MJPuEf_g&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
);

export default TrendsMap;
