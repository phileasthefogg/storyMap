import React, { useState, useRef } from "react";
import { StyleSheet, TouchableOpacity, Modal, Alert } from "react-native";
import Layout from "../constants/Layout";
import { View, Text } from "../components/Themed";
import MapView from "react-native-maps";
import TestMarkers from "../constants/TestMarkers";

import MapMarkerForm from "../components/molecules/MapMarkerForm";
import MapMarkerList from "../components/molecules/MapMarkerList";
import ZoomControl from "../components/molecules/ZoomControl";
import MapMarker from "../components/molecules/MapMarker";

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Map({ route, navigation, provider }) {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.79488483598235, // initial location latitude
    longitude: -122.40539269489221, // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [zoom, setZoom] = useState(17);
  const [markers, setMarkers] = useState<any[]>(TestMarkers);
  // const [focusedMarker, setFocusedMarker] = useState(0);
  const [showList, setShowList] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

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
      id: markers.length,
    };
    setMarkers((marks) => [...marks, newMarker]);
    zoomToPoint(coordinate);
    setModalVisible(true);
  };
  const handleZoom = (inc: 1 | -1) => {
    const newZoom = zoom + inc;
    mapRef.current.animateCamera({ zoom: newZoom }, { duration: 250 });
    setZoom(newZoom);
  };

  const handlePOIPress = (ind: number) => {
    zoomToPoint(markers[ind].coordinate);
    // setFocusedMarker(ind);
  };

  return (
    <View style={styles.map}>
      {modalVisible ? null : (
        <View
          style={{
            height: 45,
            width: 45,
            borderWidth: 0.5,
            borderColor: "grey",
            borderRadius: 5,
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => setShowList((cur) => !cur)}>
            <Text>{showList ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
      )}
      <ZoomControl setZoom={handleZoom} />
      {showList ? (
        <MapMarkerList
          // markerIndex={focusedMarker}
          markers={markers}
          panToMarker={handlePOIPress}
          navigation={navigation}
        />
      ) : null}
      <MapMarkerForm
        visibility={modalVisible}
        setVisibility={setModalVisible}
      />
      <MapView
        ref={mapRef}
        provider={provider}
        style={modalVisible ? { width: "100%", height: "50%" } : styles.map}
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
        {markers.map((mark: any, i) => {
          return (
            <MapMarker
              marker={mark}
              key={`marker-${i}`}
              onPress={() => handlePOIPress(i)}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
