import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  mapMargin: 14,
};

export default Layout;
