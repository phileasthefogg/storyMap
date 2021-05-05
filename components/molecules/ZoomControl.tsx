import React from "react";
import ZoomButton from "../atoms/ZoomButton";
import styled from "styled-components";

interface IZoomControl {
  setZoom: (newZoom) => void;
}

const Wrapper = styled.View`
  z-index: 3;
  position: absolute;
  display: flex;
  justify-content: space-between;
  top: ${({ theme }) => theme.layout.mapMargin}px;
  right: 0px;
  background-color: transparent;
  height: 14%;
  width: 15%;
`;

const ZoomControl = ({ setZoom }: IZoomControl) => {
  return (
    <Wrapper>
      <ZoomButton onPress={() => setZoom(1)} text={"+"}></ZoomButton>
      <ZoomButton onPress={() => setZoom(-1)} text={"-"}></ZoomButton>
    </Wrapper>
  );
};

export default ZoomControl;
