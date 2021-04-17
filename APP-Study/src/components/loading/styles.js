import { StyleSheet } from "react-native";
import Layout from "@constants/Layout";

export default StyleSheet.create({
  modalBackground: {
    position: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    width: Layout.window.width,
    height: Layout.window.height
  },
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  }
});
