import React, { useState, useEffect } from "react";
import { TouchableWithoutFeedback, Image } from "react-native";
import styled from "styled-components";
import { theme } from "../../constants/theme";
import { View as TView, Text as TText } from "../Themed";
import { TMarker } from "../molecules/MapMarker";

interface IMapMarkerCard {
  item: TMarker;
  itemIdx: number;
  handlePress: () => void;
  isFocused: boolean;
  listRef: any;
}

const Wrapper = styled(TView)<{ expanded: boolean }>`
  width: ${({ expanded, theme }) =>
    `${expanded ? theme.layout.width - 20 : theme.layout.width / 2}px`};
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
const Header = styled(TText)`
  font-size: 16px;
  font-weight: bold;
`;
const Subtitle = styled(TText)`
  font-size: 14px;
  font-style: italic;
`;

const MapMarkerCard = ({
  item,
  handlePress,
  isFocused,
  itemIdx,
  listRef,
}: IMapMarkerCard) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePress && handlePress();
        if (isFocused) {
          if (!expanded) {
            setExpanded(true);
            listRef.current &&
              listRef.current.scrollToOffset({
                offset: itemIdx * (theme.layout.width / 2 + 10),
              });
          } else {
            setExpanded(false);
            listRef.current &&
              listRef.current.scrollToOffset({
                offset:
                  (theme.layout.width / 2 + 10) * itemIdx -
                  theme.layout.mapMargin * 5,
              });
          }
        }
      }}
    >
      <Wrapper expanded={expanded}>
        <Header>{item.title}</Header>

        <TText style={{ fontSize: 10 }}>
          {item.coordinate.latitude + ", " + item.coordinate.longitude}
        </TText>

        <Image
          style={{ flex: 1 }}
          source={{
            uri: item.imgUrl,
          }}
        />
        {expanded ? <Subtitle>{item.description}</Subtitle> : null}
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};

export default MapMarkerCard;
