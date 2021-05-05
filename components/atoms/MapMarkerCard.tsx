import React, { useState } from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { View as TView, Text as TText } from "../Themed";
import { TMarker } from "../../types";
import { useDispatch } from "react-redux";
import { SharedElement } from "react-navigation-shared-element";

interface IMapMarkerCard {
  item: TMarker;
  handlePress: () => void;
  isFocused: boolean;
}

const Wrapper = styled(TView)<{ expanded: boolean }>`
  width: ${({ theme }) => `${theme.layout.width / 2}px`};
  height: ${({ expanded, theme }) =>
    `${
      expanded ? theme.layout.cardHeightExpand : theme.layout.cardHeightCollapse
    }px`};
  bottom: 0;
  margin: 0px 5px;
  display: flex;
  padding: 10px;
  border-radius: 5px;
  border-width: 1px;
`;
const Header = styled(TView)`
  display: flex;
  flex-direction: column;
`;
const Title = styled(TText)`
  font-size: 16px;
  font-weight: bold;
`;
const Subtitle = styled(TText)`
  font-size: 11px;
  font-style: italic;
`;
const LearnMore = styled(TText)`
  color: blue;
`;

const MapMarkerCard = ({ item, handlePress, isFocused }: IMapMarkerCard) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SharedElement id={`shared-tile-${item.title}`}>
      <Wrapper expanded={expanded}>
        <TouchableWithoutFeedback
          onPress={() => {
            handlePress && handlePress();
            if (isFocused) {
              if (!expanded) {
                setExpanded(true);
              } else {
                setExpanded(false);
              }
            }
          }}
        >
          <Header>
            <Title>{item.title}</Title>
            <Subtitle>{item.description}</Subtitle>
          </Header>
        </TouchableWithoutFeedback>
        <SharedElement id={`shared-photo-${item.id}`} style={{ flex: 1 }}>
          <Image
            style={{ flex: 1 }}
            source={{
              uri: item.imgUrl,
            }}
          />
        </SharedElement>
        {expanded ? (
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch({ type: "SET_PLACE_DETAIL", payload: item });
              navigation.navigate("Detail", {
                photo: `shared-photo-${item.id}`,
                tile: `shared-tile-${item.title}`,
              });
            }}
          >
            <LearnMore>{"Learn More"}</LearnMore>
          </TouchableWithoutFeedback>
        ) : null}
      </Wrapper>
    </SharedElement>
  );
};

export default MapMarkerCard;
