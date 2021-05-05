import React from "react";
import styled from "styled-components";

import { View, TouchableOpacity, Text } from "react-native";

const Wrapper = styled(View)<{
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}>`
  height: 45px;
  width: 45px;
  border-width: 0.5px;
  border-color: grey;
  border-radius: 5px;
  position: absolute;
  top: ${({ theme }) => theme.layout.mapMargin}px;
  left: ${({ theme }) => theme.layout.mapMargin}px;
  z-index: 10;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

const MapButton = ({ onPress, text }) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onPress}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MapButton;
