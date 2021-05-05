import React, { useEffect } from "react";
import styled from "styled-components";
import { View as TView, Text as TText } from "../components/Themed";
import { Image, StatusBar, ScrollView, Button } from "react-native";
import { useSelector } from "react-redux";
import { placeSelector } from "../reducers/rootReducer";
import { SharedElement } from "react-navigation-shared-element";
import { DropDownHolder } from "../types";
const Wrapper = styled(TView)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const Content = styled(TView)`
  display: flex;
  height: 90%;
  padding: 2%;
  flex-direction: column;
  align-items: center;
`;
const Caption = styled(TText)`
  font-size: 11px;
  font-style: italic;
`;
const Description = styled(TText)`
  align-self: flex-start;
`;

const Footer = styled(TView)`
  height: 10%;
  border-top-width: 0.5px;
  width: 100%;
  padding: 5%;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Detail = ({ route, navigation }) => {
  const places = useSelector(placeSelector);
  useEffect(() => {
    navigation.setOptions({ headerTitle: places.placeDetail.title });
  }, [places.placeDetail]);
  return (
    <SharedElement id={`shared-tile-${places.placeDetail.title}`}>
      <Wrapper>
        <StatusBar />
        <Content>
          <SharedElement
            id={`shared-photo-${places.placeDetail.id}`}
            style={{ width: "100%", height: "40%" }}
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: places.placeDetail.imgUrl,
              }}
            />
          </SharedElement>
          <Caption>{places.placeDetail.subtitle}</Caption>
          <ScrollView style={{ marginVertical: "2%" }}>
            <Description>
              Portsmouth Square is located on the site of the first public
              square, The Grand Plaza, established in the early 19th century in
              the Mexican community of Yerba Buena. The site was first used as a
              public gathering site in 1833; it was set aside as an official
              plaza in 1835. Jean Jacques Vioget was commissioned to survey the
              settlement in 1839, and Vioget imposed a grid of streets centered
              on the plaza overlooking the cove.In 1844, a custom house was
              built at the northwest corner of the plaza by the Mexican
              government. During the Mexican–American War, Captain John Berrien
              Montgomery of the USS Portsmouth was ordered to seize Yerba Buena.
              On July 9, 1846, Montgomery and a party of 17 men landed and
              raised the first American flag near the Mexican adobe custom
              house. The plaza would be named Portsmouth Square in honor of the
              ship later that year, and the settlement's name was changed to San
              Francisco in 1847. Portsmouth Square is known as the "Heart" or
              "Living Room" of Chinatown. Residents of the neighborhood play
              games, practice tai chi, and socialize in the park. It was also
              home for a large number of homeless people. San Francisco Board of
              Supervisors President Aaron Peskin, who represented the area
              surrounding the park, and Mayor Gavin Newsom have criticized the
              Department of Recreation and Parks for failing in its upkeep of
              the park. Regarding these criticisms, the city department has
              tried to hire additional gardeners and custodians despite budget
              cuts. Another city department, Public Works, was urged by Newsom
              to help clean up the park, at least temporarily. The San Francisco
              Planning Department has initiated the Portsmouth Square Area
              Project to enhance the space and surrounding streets. A report
              evaluating the existing conditions and feasibility of updates was
              completed in December 2014. On October 13, 2020, the Recreation
              and Park Department announced the schematic design was complete.
            </Description>
          </ScrollView>
        </Content>
        <Footer>
          <Button
            onPress={() =>
              DropDownHolder.alert(
                "success",
                "Saved",
                `Added ${places.placeDetail.title} to your Saved Places`
              )
            }
            title="Save"
          ></Button>
        </Footer>
      </Wrapper>
    </SharedElement>
  );
};

export default Detail;
