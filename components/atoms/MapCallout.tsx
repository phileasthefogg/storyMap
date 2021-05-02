import React from "react";
import { Callout } from "react-native-maps";
import { View as TView, Text as TText } from "../Themed";

interface IMapCallout {
  title: string;
  description?: string;
}

const MapCallout = ({ title, description }: IMapCallout) => (
  <Callout>
    <TView>
      <TText>{title}</TText>
      <TText>{description}</TText>
    </TView>
  </Callout>
);

export default MapCallout;
