import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { TMarker } from "../../types";
import { View as TView, Text as TText } from "../Themed";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { useDispatch } from "react-redux";

interface ILibraryStoryCard {
  item: TMarker;
}

const Wrapper = styled(TView)`
  width: 100%;
  height: ${({ theme }) => theme.layout.height * 0.1}px;
  margin-vertical: 2%;
`;

const Header = styled(TView)`
  display: flex;
  height: ${({ theme }) => theme.layout.height * 0.1}px;
  flex-direction: row;
  border-left-width: 0.5px;
  border-right-width: 0.5px;
`;

const Photo = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Info = styled(TView)`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-horizontal: 5%;
  border-top-width: 0.5px;
`;
const Title = styled(TText)`
  font-weight: bold;
`;
const Subtitle = styled(TText)`
  font-style: italic;
  font-size: 10px;
`;

const Content = styled(TView)<{ expanded: boolean }>`
  height: ${({ theme, expanded }) =>
    expanded ? theme.layout.height * 0.15 : 0}px;
  border-width: 0.5px;
  border-top-width: ${({ expanded }) => (expanded ? 0.5 : 0)}px;
  overflow: hidden;
  padding: ${({ expanded }) => (expanded ? 1 : 0)}%;
`;

const LibraryStoryCard = ({ item }: ILibraryStoryCard) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "SET_PLACE_DETAIL", payload: item });
          navigation.navigate("Detail", {
            photo: `shared-photo-${item.id}`,
            tile: `shared-tile-${item.title}`,
            title: item.title,
          });
        }}
      >
        <Header>
          <Photo
            style={{ flex: 1 }}
            source={{
              uri: item.imgUrl,
            }}
          />
          <Info>
            <Title>{item.title}</Title>
            <Subtitle>{item.subtitle}</Subtitle>
          </Info>
        </Header>
      </TouchableOpacity>
      <Content>
        <TText>{item.description}</TText>
      </Content>
    </Wrapper>
  );
};

export default LibraryStoryCard;
