import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chatContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    paddingTop: 20,
    elevation: 20,
  },
  sendMessage: {
    width: "100%",
    height: 70,
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 5,
    shadowRadius: 13.16,

    elevation: 20,
    paddingHorizontal: 20,
  },
});
export default styles;
