import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { View } from "../Themed";
import { useDispatch, useSelector } from "react-redux";
import { placeSelector, mapSelector } from "../../reducers/rootReducer";
import MapView from "react-native-maps";

import MapMarkerList from "./MapMarkerList";
import ZoomControl from "./ZoomControl";
import MapMarker from "./MapMarker";

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default ({ formDisplayed, setFormDisplay }) => {
  const dispatch = useDispatch();
  const places = useSelector(placeSelector);
  const map = useSelector(mapSelector);
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.79488483598235, // initial location latitude
    longitude: -122.40539269489221, // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [zoom, setZoom] = useState(17);

  const zoomToPoint = (coordinate) => {
    mapRef.current.animateCamera({ center: { ...coordinate }, zoom: 19 }, 500);
    setRegion((r) => ({ ...r, ...coordinate }));
    zoom !== 19 && setZoom(19);
  };
  const createMarker = (coordinate) => {
    const newMarker = {
      coordinate: {
        latitude: coordinate.latitude as number,
        longitude: coordinate.longitude as number,
      },
      title: "Best Place",
      description: "Description1",
      id: places.places.length,
    };
    zoomToPoint(coordinate);
    dispatch({ type: "UPDATE_PLACES", payload: [...places.places, newMarker] });
    setFormDisplay(true);
  };
  const handleZoom = (inc: 1 | -1) => {
    const newZoom = zoom + inc;
    mapRef.current.animateCamera({ zoom: newZoom }, { duration: 250 });
    setZoom(newZoom);
  };

  useEffect(() => {
    zoomToPoint(places.places[map.focusIndex].coordinate);
  }, [map.focusIndex]);

  return (
    <View style={styles.map}>
      <ZoomControl setZoom={handleZoom} />

      <MapView
        ref={mapRef}
        // provider={provider}
        style={formDisplayed ? { width: "100%", height: "50%" } : styles.map}
        initialCamera={{
          center: { latitude: region.latitude, longitude: region.longitude },
          zoom: 17,
          pitch: 0,
          heading: 0,
          altitude: 20,
        }}
        initialRegion={region}
        zoomTapEnabled={true}
        onPress={(e) => zoomToPoint(e.nativeEvent.coordinate)}
        onLongPress={(e) => createMarker(e.nativeEvent.coordinate)}
      >
        {places.places.map((mark: any, i) => {
          return (
            <MapMarker
              marker={mark}
              key={`marker-${i}`}
              onPress={() => dispatch({ type: "SET_FOCUS_IND", payload: i })}
            />
          );
        })}
      </MapView>
      <MapMarkerList />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
