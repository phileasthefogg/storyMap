import React, { useState, useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mapSelector, placeSelector } from "../../reducers/rootReducer";
import styled from "styled-components";
import MapMarkerCard from "../atoms/MapMarkerCard";
import { layout, theme } from "../../constants/theme";
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
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    map.listExpanded &&
      listRef.current.scrollToOffset(offset - layout.width / 2);
  }, [offset]);

  useEffect(() => {
    const newOffset =
      (theme.layout.width / 2 + 10) * map.focusIndex -
      theme.layout.mapMargin * 5;
    // listRef &&
    listRef.current?.scrollToOffset({
      offset: newOffset,
    }) && setOffset(newOffset);
  }, [map.focusIndex]);

  const scrollToInd = (ind) => {
    dispatch({ type: "SET_FOCUS_IND", payload: ind });
  };
  const renderTile = ({ item, index }) => {
    return (
      <MapMarkerCard
        item={item}
        handlePress={
          () =>
            map.listExpanded && index === map.focusIndex
              ? dispatch({ type: "SET_LIST_EXPAND", payload: false }) //collapse focused card
              : index === map.focusIndex
              ? dispatch({ type: "SET_LIST_EXPAND", payload: true }) //expand focused card
              : scrollToInd(index) //scroll to an unfocused card
        }
        isFocused={index === map.focusIndex}
      />
    );
  };

  return (
    <>
      <MapButton
        onPress={() => {
          dispatch({
            type: "SET_LIST_VISIBILITY",
            payload: !map.listVisible,
          });
        }}
        text={map.listVisible ? "Hide" : "Show"}
      />
      {map.listVisible ? (
        <List
          ref={listRef}
          renderItem={(e) => renderTile({ item: e.item, index: e.index })}
          keyExtractor={(item: any, index: number) => index.toString()}
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
