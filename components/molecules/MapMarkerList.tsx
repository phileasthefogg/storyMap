import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import MapMarkerCard from "../atoms/MapMarkerCard";
import { layout, theme } from "../../constants/theme";

interface IMapMarkerList {
  markers: any[];
  markerIndex?: number;
  panToMarker?: (i: number) => void;
}

const List = styled.FlatList<{ expanded: boolean }>`
  z-index: 5;
  height: ${({ expanded, theme }) =>
    `${
      expanded ? theme.layout.cardHeightExpand : theme.layout.cardHeightCollapse
    }px`};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.layout.mapMargin / 2}px;
  position: absolute;
  bottom: 0;
`;

const MapMarkerList = ({
  markerIndex = 0,
  markers,
  panToMarker,
}: IMapMarkerList) => {
  const listRef = useRef(null);
  const [isExpanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    isExpanded && listRef.current.scrollToOffset(offset - layout.width / 2);
  }, [offset]);

  useEffect(() => {
    const newOffset =
      (theme.layout.width / 2 + 10) * markerIndex - theme.layout.mapMargin * 5;
    listRef &&
      listRef.current.scrollToOffset({
        offset: newOffset,
      }) &&
      setOffset(newOffset);
  }, [markerIndex]);

  const scrollToInd = (ind) => {
    panToMarker && panToMarker(ind);
  };
  const renderTile = ({ item, index }) => {
    return (
      <MapMarkerCard
        item={item}
        itemIdx={index}
        handlePress={
          () =>
            isExpanded && index === markerIndex
              ? setExpanded(false) //collapse focused card
              : index === markerIndex
              ? setExpanded(true) //expand focused card
              : scrollToInd(index) //scroll to an unfocused card
        }
        isFocused={index === markerIndex}
        listRef={listRef}
      />
    );
  };

  return (
    <List
      ref={listRef}
      renderItem={(e) => renderTile({ item: e.item, index: e.index })}
      keyExtractor={(item: any, index: number) => index.toString()}
      data={markers}
      horizontal={true}
      expanded={isExpanded}
      contentContainerStyle={{ display: "flex", alignItems: "flex-end" }}
    />
  );
};

export default MapMarkerList;
