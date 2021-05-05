import React, { useEffect, useRef, useCallback } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector, placeSelector } from "../../reducers/rootReducer";
import styled from "styled-components";
import MapMarkerCard from "../atoms/MapMarkerCard";
import { theme } from "../../constants/theme";
import MapButton from "../atoms/MapButton";

const List = styled(FlatList)<{ expanded: boolean }>`
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

const MapMarkerList = () => {
  const dispatch = useDispatch();
  const map = useSelector(mapSelector);
  const places = useSelector(placeSelector);
  const listRef = useRef(null);

  useEffect(() => {
    const newOffset =
      (theme.layout.width / 2 + 10) * map.focusIndex -
      theme.layout.mapMargin * 5;

    listRef.current?.scrollToOffset({
      offset: newOffset,
    });
  }, [map.focusIndex]);

  const renderTile = useCallback(({ item, index }) => {
    return <MapMarkerCard item={item} index={index} />;
  }, []);
  const extractKey = useCallback(
    (item: any, index: number) => `marker-tile-${index.toString()}`,
    []
  );
  const toggleListVisibility = useCallback(() => {
    dispatch({
      type: "SET_LIST_VISIBILITY",
      payload: !map.listVisible,
    });
  }, [map.listVisible]);

  return (
    <>
      {map.formVisible ? null : (
        <MapButton
          onPress={toggleListVisibility}
          text={map.listVisible ? "Hide" : "Show"}
        />
      )}
      {map.listVisible ? (
        <List
          ref={listRef}
          renderItem={renderTile}
          keyExtractor={extractKey}
          data={places.places}
          horizontal={true}
          expanded={map.listExpanded}
          contentContainerStyle={{ display: "flex", alignItems: "flex-end" }}
        />
      ) : null}
    </>
  );
};

export default MapMarkerList;
