import React from "react";
import { Marker } from "react-native-maps";
import MapCallout from "../atoms/MapCallout";
import { TMarker } from "../../types";

interface IMapMarker {
  marker: TMarker;
  onPress?: () => void;
}

const MapMarker = ({ marker, onPress }: IMapMarker) => (
  <Marker coordinate={marker.coordinate} onPress={() => onPress && onPress()}>
    <MapCallout title={marker.title} subtitle={marker.subtitle} />
  </Marker>
);

export default MapMarker;
