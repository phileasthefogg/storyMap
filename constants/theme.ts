import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const layout = {
  width,
  height,
  mapMargin: 20,
  cardHeightCollapse: height / 6,
  cardHeightExpand: height / 4,
};

type TLayout = typeof layout;

const colors = {
  primary100: "#4c6fff",
  white: "#ffffff",
  black: "#16192c",
};

type TColors = typeof colors;

export interface ITheme {
  layout: { [key in keyof TLayout]: number };
  colors: { [key in keyof TColors]: string };
}

export const theme: ITheme = { colors, layout };
