import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCE4EC"
  },
  containerButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "space-around",
    marginBottom: 20
  },
  button: {
    padding:10,
    backgroundColor: "white",
    width: 240,
    height: 50,
    borderColor: "green",
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  iteam: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderColor: "green",
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
