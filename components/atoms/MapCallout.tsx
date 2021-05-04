import React from "react";
import { Callout } from "react-native-maps";
import { View as TView, Text as TText } from "../Themed";

interface IMapCallout {
  title: string;
  subtitle?: string;
}

const MapCallout = ({ title, subtitle }: IMapCallout) => (
  <Callout>
    <TView>
      <TText>{title}</TText>
      <TText>{subtitle}</TText>
    </TView>
  </Callout>
);

export default MapCallout;
