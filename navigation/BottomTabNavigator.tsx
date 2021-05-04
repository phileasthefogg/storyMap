/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Map from "../screens/Map";
import Library from "../screens/Library";
import Detail from "../screens/Detail";

import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Story Map"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Story Map"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createSharedElementStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Map"
        component={Map}
        options={{ headerTitle: "Story Map" }}
      />
      <TabOneStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: "Detail",
          title: "Detail",
        }}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { photo, tile } = route.params;
          return [
            { id: tile, animation: "fade" },
            { id: photo, animation: "fade" },
          ];
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createSharedElementStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Library"
        component={Library}
        options={{ headerTitle: "Library" }}
      />
      <TabTwoStack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          headerTitle: "Detail",
          title: "Detail",
        })}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { photo, tile } = route.params;
          return [
            { id: tile, animation: "fade" },
            { id: photo, animation: "fade" },
          ];
        }}
      />
    </TabTwoStack.Navigator>
  );
}
