import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants/theme";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import DropdownAlert from "react-native-dropdownalert";
import { Provider } from "react-redux";
import store from "./store";
import { DropDownHolder } from "./types";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </ThemeProvider>
        </Provider>
        <DropdownAlert
          ref={(ref) => DropDownHolder.setDropDown(ref)}
          closeInterval={3000}
        />
      </View>
    );
  }
}
