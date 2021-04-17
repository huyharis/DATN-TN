import { StyleSheet } from "react-native";
import colors from "../../configs/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20,
  },
  onTop: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
  },
  user: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },    
  nameText: {
    color: colors.black_text,
    fontWeight: "bold",
    paddingBottom: 0
  },
  point: {
    margin: 0,
    paddingTop: 0,
    fontSize: 13,
    fontWeight: "500",
  },
  image: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 1,
    top: hp("-5%"),
    left: wp("9%"),
  },
  box: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.5)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 1,
    shadowRadius: 2,
    borderColor: "#000",
    borderRadius: 25,
    marginBottom: 10,
  },
  headerBox: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  level: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  textLevel: {
    paddingLeft: 2,
    fontSize: 11,
    fontWeight: "bold",
    color: colors.black_text,
    paddingTop: 0,
    paddingBottom: 0,
  },
  pointBox: {
    paddingRight: 15,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 12,
    fontWeight: "500",
  },
  textName: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: colors.black_text,
    fontSize: 14
  },
});

export default styles;
