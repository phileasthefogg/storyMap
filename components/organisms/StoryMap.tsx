import React from "react";
import { View } from "../../components/Themed";

import Map from "../molecules/MapView";
import MapMarkerForm from "../../components/molecules/MapMarkerForm";

const StoryMap = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Map />
      <MapMarkerForm />
    </View>
  );
};

export default StoryMap;
