import { StyleSheet } from "react-native";
import colors from '../../configs/colors'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  backarrow: {
    top: 7,
    width: 25,
    height: 25
  },
  header: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  titleHeader: {
    color: "#234958",
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textHeader: {
    color: "#234958",
    fontSize: 15,
    textAlign: 'center'
  },
  containerSlider: { justifyContent: "center", alignItems: "center" },
  containerViewSlider: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center", alignItems: "center"
  },
  headerContainer: {
    overflow: "hidden",
    // width: 300,
    height: 250,
    // borderBottomWidth: 5,
    // borderBottomColor: "blue",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 1,
    backgroundColor: "#C0DDF4",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  headerTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    // width: '100%',
    // backgroundColor: '#C0DDF4'
  },
  headerText: {
    color: '#234958',
    fontSize: 18,
    fontWeight: 'bold'
  },
  slider: {
    overflow: "hidden",
    // width: 300,
    height: 250,
    borderBottomWidth: 5,
    borderBottomColor: "blue",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  cardGame: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#F4511E",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "white",
    margin: 10
  },
  cardGameTwo: {
    flex: 1,
    height: 100,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#F4511E",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "white",
  },
  soundIcon: { position: "absolute", top: 2, right: 2 },
  sound: {
    borderBottomWidth: 5,
    height: 80,
    borderBottomColor: "#76FF03",
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "white",
    margin: 10,
    padding: 10
  },
  titleGame: {
    fontSize: 30,
    fontWeight: "bold"
  },
  progressContainer: {
    marginBottom: 10
  },
  progressText: {
    color: '#2C6694',
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 19
  },
  eventText: {
    fontSize: 13,
    color: '#2C6694',
    paddingBottom: 10
  },
  containerStyleItem: {
    padding: 10,
    backgroundColor: '#C0DDF4',
    borderRadius: 10,
    marginBottom: 7
  },
  titleStyle: {
    color: '#2C6694',
    fontWeight: 'bold'
  },
  progress: {
    // position: 'absolute',
    // bottom: 10,
    backgroundColor: '#C0DDF4',
    borderWidth: 0
    // width: '90%'
  },
  icon: {
    width: 25,
    height: 25
  },
  modalbox: {
    width: wp("80%"),
    height: hp('50%'),
    top: hp("15%"),
    left: wp("10%")
  },
  containerStyleModal: {
    padding: 10,
    backgroundColor: '#C0DDF4',
    borderRadius: 10,
    marginBottom: 7,
    width: '100%'
  },
  icContainer: {
    position: 'absolute',
    right: -5,
    top: -5
  },
  icClose: {
    width: 30,
    height: 30,
    tintColor: "#000"
  },
});
