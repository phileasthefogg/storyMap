import * as React from "react";
import { SectionList } from "react-native";
import styled from "styled-components";

import TestMarkers from "../constants/TestMarkers";
import { Text, View } from "../components/Themed";

import LibraryStoryCard from "../components/atoms/LibraryStoryCard";

const Wrapper = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const List = styled(SectionList)`
  height: 100%;
  width: 100%;
  padding: 5%;
`;
const Header = styled(Text)`
  font-size: 18px;
`;
const Divider = styled(View)`
  margin-vertical: 2%;
  height: 1px;
  width: 100%;
`;

export default function TabTwoScreen() {
  return (
    <Wrapper>
      <List
        sections={[
          {
            title: "Starred",
            data: TestMarkers.slice(0, 3),
          },
          {
            title: "Parks",
            data: TestMarkers.filter((mark) => mark.category === "Parks"),
          },
          {
            title: "Culture",
            data: TestMarkers.filter((mark) => mark.category === "Culture"),
          },
          {
            title: "History",
            data: TestMarkers.filter((mark) => mark.category === "History"),
          },
          {
            title: "Food",
            data: TestMarkers.filter((mark) => mark.category === "Food"),
          },
        ]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <LibraryStoryCard item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Header>{title}</Header>
        )}
        SectionSeparatorComponent={() => (
          <Divider lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        )}
      />
    </Wrapper>
  );
}
