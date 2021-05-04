import React from "react";
import { View as TView, Text as TText } from "../Themed";
import {
  Modal,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Input from "../atoms/Input";
import Dropdown from "../atoms/Dropdown";
import styled from "styled-components";

interface IMapMarkerForm {
  visibility: boolean;
  setVisibility: (newVis: boolean) => void;
}

const Wrapper = styled(TView)`
  border-width: 1px;
  justify-content: space-between;
  height: 80%;
  padding: 2%;
`;
const Header = styled(TView)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const Title = styled(TText)`
  font-size: 18px;
`;

const MapMarkerForm = ({ visibility, setVisibility }: IMapMarkerForm) => {
  return (
    <Modal
      animationType="slide"
      visible={visibility}
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisibility(!visibility);
      }}
    >
      <TView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "50%",
          width: "100%",
        }}
      >
        <Wrapper>
          <Header>
            <Title>Add a New Marker</Title>
            <TouchableOpacity
              onPress={() => {
                setVisibility(false);
              }}
            >
              <TText>CLOSE</TText>
            </TouchableOpacity>
          </Header>
          <Input label="Title" placeholder="Title" />
          <Input label="Subtitle" placeholder="Subtitle" />
          <Dropdown
            label="Category"
            options={["Culture", "Food", "History", "Parks"]}
          />
        </Wrapper>
      </TView>
    </Modal>
  );
};

export default MapMarkerForm;
