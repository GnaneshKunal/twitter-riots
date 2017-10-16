import * as React from 'react';
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  FusionTablesLayer,
} from "react-google-maps";

interface IMapProps {
    geo: {
        lat: Number,
        long: Number,
        woeid: Number
    }
}

export default class Map extends React.Component<IMapProps, {}> {
    public render(): JSX.Element {
        const MapWithAFusionTablesLayer = compose(
        withProps({
          googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBmQ6a6fqOabymhahuL4xyL5--MJPuEf_g &v=3.exp&libraries=geometry,drawing,places",
          loadingElement: <div style={{ height: `100%` }} />,
          containerElement: <div style={{ height: `400px` }} />,
          mapElement: <div style={{ height: `100%` }} />,
        }),
        withScriptjs,
        withGoogleMap
        )(props =>
        <GoogleMap
          defaultZoom={11}
          defaultCenter={{ lat: this.props.geo.lat, lng: this.props.geo.long }}
        >
          <FusionTablesLayer
            url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
            options={{
              query: {
                select: `Geocodable address`,
                from: `1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg`
              }
            }}
          />
        </GoogleMap>
        );
        return (
            <div>
                {this.props.geo.lat} by {this.props.geo.long}
                <MapWithAFusionTablesLayer />
            </div>
        );
    }
}
