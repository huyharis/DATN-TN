import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { getStatusBarHeight } from "react-native-status-bar-height";
import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    // paddingTop: 20,
    // flex: 1,
    // width: "100%",
    // justifyContent: "center",
    // alignItems: "center"
    width: wp("100%"),
    height: hp("100%"),
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    paddingBottom: wp("2%"),
    paddingTop: 40
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: hp("6%"),
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 4,
    shadowOpacity: 0.4,
    borderColor: "rgba(244, 144, 12, 0.8)",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: wp("6%"),
    paddingRight: wp("6%")
  },
  textWhite: {
    color: colors.white_text,
    fontSize: hp("2.2%")
  },
  time: {
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    width: wp("30%"),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "36%",
    borderRadius: 18
  },
  coin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  question: {
    paddingLeft: wp("4%"),
    paddingRight: wp("4%")
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp("0.5%"),
    paddingBottom: hp("0.2%"),
    width: "100%",
    justifyContent: "space-between",
    borderBottomColor: "rgba(244, 144, 12, 0.8)",
    borderBottomWidth: 3,
    borderRadius: 3
  },
  titleText: {
    color: colors.white_text,
    fontWeight: "bold",
    fontSize: hp("3.5%"),
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 4,
    shadowOpacity: 0.4
  },
  titleModal: {
    fontSize: hp("4%"),
    paddingBottom: hp("2%"),
    color: "#F4900C",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: hp("4%")
  },
  change: {
    width: wp("20%"),
    height: hp("3%"),
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textChange: {
    color: colors.white_text,
    fontSize: hp("1.5%"),
    paddingLeft: 5
  },
  questionText: {
    fontSize: hp("2.5%"),
    letterSpacing: 0.02,
    color: colors.white_text,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 4,
    shadowOpacity: 0.4,
    fontWeight: "bold",
    paddingTop: hp("1%"),
    textAlign: "center"
  },
  anwsers: {
    paddingTop: hp("3%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "auto"
  },
  anwserText: {
    color: colors.white_text,
    fontSize: hp("2%"),
    lineHeight: hp("2%"),
    letterSpacing: 0.02,
    textAlign: "center"
  },
  boxAnwser: {
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    shadowColor: "rgba(255, 255, 255, 0.2)"
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // elevation: 10,
    // shadowOpacity: 10
  },
  boxAudio: {
    width: wp("15%"),
    height: hp("8%")
  },
  input: {
    backgroundColor: "rgba(244, 144, 12, 0.27)",
    borderColor: "transparent",
    height: hp("18%"),
    justifyContent: "center"
  },
  textButton: {
    color: colors.white_text,
    fontWeight: "normal",
    fontSize: hp("2%"),
    fontWeight: "500",
    textTransform: "none"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'flex-end',
    paddingTop: hp("1%")
  },
  btnBack: {
    backgroundColor: "rgba(244, 144, 12, 0.5)",
    borderRadius: 30,
    width: wp("50%"),
    // height: hp("6%"),
    alignContent: "center",
    position: "relative"
  },
  submitText: {
    fontSize: hp("3.5%"),
    lineHeight: hp("3.5%"),
    color: colors.white_text,
    textTransform: "none"
  },
  image: {
    width: "100%",
    height: hp('25%'),
    borderRadius: 5,
    marginTop: hp("1%"),
    marginBottom: hp("1%")
  },
  imageHeader: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10,
    padding: 10
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    width: wp("60%"),
    height: hp("17%"),
    borderRadius: 10,
    paddingTop: hp("5%"),
    paddingBottom: hp("5%"),
    paddingLeft: wp("5%"),
    paddingRight: wp("5%"),
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    backgroundColor: colors.white_color,
    zIndex: 100,
    borderRadius: 15,
    shadowColor: "rgba(255, 255, 255, 0.2)",
    shadowOffset: {
      width: 2,
      height: 4
    },
    elevation: 15,
    shadowOpacity: 0.15
  },
  modalContent: {
    textAlign: "center",
    fontSize: hp("2.7%"),
    letterSpacing: 0.02,
    fontWeight: "300"
  },
  trick: {
    width: "80%",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "rgba(244, 144, 12, 0.8)"
  },
  trick2: {
    width: "50%",
    borderWidth: 1,
    borderColor: "rgba(244, 144, 12, 0.8)",
    marginBottom: 10,
    borderRadius: 10
  },
  trickText: {
    position: "absolute",
    top: -13,
    left: "45%",
    backgroundColor: "#fff",
    width: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(244, 144, 12, 0.8)"
  },
  infoContainer: {
    paddingTop: 10,
    alignContent: 'space-between',
    
  },
  info: {
    alignItems: "center",
    flex: 1
  },
  score: {

  },
  iconWar: {
    width: 40,
    height: 40
  },
  textScore: {
    paddingTop: hp('1%'),
    color: colors.white_text,
    fontSize: hp("3%"),
    textAlign: 'center'
  }
});

export default styles;
