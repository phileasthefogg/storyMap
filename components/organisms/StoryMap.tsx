import React, { useState } from "react";
import { View } from "../../components/Themed";

import Map from "../molecules/MapView";
import MapMarkerForm from "../../components/molecules/MapMarkerForm";

const StoryMap = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <Map formDisplayed={modalVisible} setFormDisplay={setModalVisible} />
      <MapMarkerForm
        visibility={modalVisible}
        setVisibility={setModalVisible}
      />
    </View>
  );
};

export default StoryMap;
