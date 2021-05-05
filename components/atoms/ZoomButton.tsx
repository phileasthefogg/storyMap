import React from "react";
import { TouchableOpacity } from "react-native";
import { View as TView, Text as TText } from "../Themed";
import Layout from "../../constants/Layout";

interface IZoomButton {
  onPress: () => void;
  text: string;
}

const ZoomButton = ({ onPress, text }: IZoomButton) => (
  <TouchableOpacity onPress={onPress}>
    <TView
      style={{
        height: 40,
        width: 40,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "lightgrey",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // left: Layout.mapMargin,
      }}
    >
      <TText style={{ fontSize: 15 }}>{text}</TText>
    </TView>
  </TouchableOpacity>
);

export default ZoomButton;
