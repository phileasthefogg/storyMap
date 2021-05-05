import React, { useEffect } from "react";
import { View as TView, Text as TText } from "../Themed";
import {
  Modal,
  Alert,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector, placeSelector } from "../../reducers/rootReducer";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import Dropdown from "../atoms/Dropdown";
import styled from "styled-components";
import { useForm, useFormState, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createMarkerSchema } from "../../schemas/markerSchema";

const Wrapper = styled(TView)`
  border-width: 1px;
  height: 100%;
  padding: 2%;
`;
const Header = styled(TView)`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  width: 100%;
  height: 10%;
  justify-content: space-between;
  left: 2%;
  padding: 2%;
  position: absolute;
`;
const Title = styled(TText)`
  font-size: 18px;
  align-self: center;
`;
const Close = styled(TText)`
  position: relative;
  right: 0;
  top: 0;
`;
const Form = styled(TView)`
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: space-evenly;
  top: 15%;
  left: 2%;
  width: 100%;
  height: 65%;
`;

interface IMapMarkerForm {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  // coordinate: { latitude: number | null; longitude: number | null };
}

const MapMarkerForm = () => {
  const dispatch = useDispatch();
  const map = useSelector(mapSelector);
  const places = useSelector(placeSelector);
  const { handleSubmit, control } = useForm<IMapMarkerForm>({
    criteriaMode: "all",
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      // coordinate: { latitude: null, longitude: null },
    },
    resolver: yupResolver(createMarkerSchema()),
  });

  useEffect(() => {
    //make sure that we are in 'edit' mode when the form is opened.  We need to know if a marker was created with all the fields, if it wasn't, or if the marker was not 'saved', we need to remove the marker from the map.
    //we can figure out if a 'save' has occured by updating / checking the editState on successful marker save / modal close
    map.formVisible && dispatch({ type: "SET_EDIT_STATE", payload: true });
  }, [map.formVisible]);
  return (
    <Modal
      animationType="slide"
      visible={map.formVisible}
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch({ type: "SET_FORM_VISIBILITY", payload: !map.formVisible });
      }}
    >
      <TView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "75%",
          width: "100%",
        }}
      >
        <Wrapper>
          <Header>
            <Title>Add a New Marker</Title>
            <TouchableOpacity
              onPress={() => {
                dispatch({ type: "SET_FORM_VISIBILITY", payload: false });
              }}
            >
              <Close>CLOSE</Close>
            </TouchableOpacity>
          </Header>
          <Form>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input label="Title" placeholder="Title" {...field} />
              )}
            />
            <Controller
              name="subtitle"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Subtitle"
                  onChange={onChange}
                  value={value}
                  placeholder="Subtitle"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea
                  label="Description"
                  placeholder="Description"
                  {...field}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Category"
                  options={[
                    " -- Select a Category -- ",
                    "Culture",
                    "Food",
                    "History",
                    "Parks",
                  ]}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Button
              title={"Save"}
              onPress={() => {
                handleSubmit(
                  (data) => {
                    const lastMarkInd = places.places.length - 1;
                    const updatedMark = {
                      ...places.places[lastMarkInd],
                      ...data,
                    };
                    let updatedPlaces = places.places.slice(0, lastMarkInd);
                    dispatch({
                      type: "UPDATE_PLACES",
                      payload: [...updatedPlaces, updatedMark],
                    });
                    dispatch({ type: "SET_EDIT_STATE", payload: false });
                    dispatch({ type: "SET_FORM_VISIBILITY", payload: false });
                  },
                  (e) => {
                    console.log(e, "SUBMIT ERROR");
                  }
                )();
              }}
            ></Button>
          </Form>
        </Wrapper>
      </TView>
    </Modal>
  );
};

export default MapMarkerForm;
