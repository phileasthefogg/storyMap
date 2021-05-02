import React from "react";
import { Marker } from "react-native-maps";
import MapCallout from "../atoms/MapCallout";

export type TMarker = {
  title: string;
  coordinate: { latitude: number; longitude: number };
  description: string;
  imgUrl?: string;
};

interface IMapMarker {
  marker: TMarker;
  onPress?: () => void;
}

const MapMarker = ({ marker, onPress }: IMapMarker) => (
  <Marker coordinate={marker.coordinate} onPress={() => onPress && onPress()}>
    <MapCallout title={marker.title} description={marker.description} />
  </Marker>
);

export default MapMarker;
