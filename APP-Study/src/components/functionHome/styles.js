import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: { fontSize: 20, color: "#000000" },
  viewBackGround:{ flex: 1, justifyContent: "center", alignItems: "center" },
  touchable:{
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#90CAF9",
    width: "80%",
    height: "90%",
    marginBottom: 5,
    flexDirection: "row",
    shadowColor: "gray",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    elevation: 10
  },
});
