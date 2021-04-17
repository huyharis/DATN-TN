import { StyleSheet } from "react-native";
import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddi ng: 10,
    // paddingTop: 20
  },
  backarrow: {
    top: 7,
    width: 25,
    height: 25,
  },
  header: {
    backgroundColor: colors.white,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    paddingBottom: 0,
    height: 75
  },
  titleHeader: {
    color: "#234958",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  textHeader: {
    color: "#234958",
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 15,
  },
  listItem3: {
    borderRadius: 15,
    backgroundColor: "#EBF6FF",
    marginBottom: 10,
  },
  listItem2: {
    borderRadius: 15,
    backgroundColor: "#EFE5D3",
    marginBottom: 10,
  },
  listItem1: {
    borderRadius: 15,
    backgroundColor: "#FFCDC2",
    marginBottom: 10,
  },
  rightTitleStyle: {
    color: "#2C6694",
  },
  titleStyle: {
    color: "#2C6694",
    fontWeight: "bold",
  },
  titleItem: {
    color: "#234958",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  subtitleItem: {
    color: "#234958",
    paddingLeft: 10,
    paddingBottom: 13,
  },
});

export default styles;
