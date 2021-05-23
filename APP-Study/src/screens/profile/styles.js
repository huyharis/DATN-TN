import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../configs';
import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
  },
  header: {
    flex: 2,
    backgroundColor: "gray",
    alignItems: "center",
  },
  contact: {
    margin: 20,
  },
  card: {
    width: DEVICE_WIDTH - 40,
    height: DEVICE_WIDTH - 60,
    // width:'100%',
    // height: DEVICE_WIDTH - 60,
    // backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 40,
    padding: 22,
    marginTop: 100,
    borderWidth: 1
  },
  avatar: {
    position: "absolute",
    alignSelf: "center",
    top: -60,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
    shadowOpacity: 4,
    zIndex: 100
  },
  title: {
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 23,
    lineHeight: 27,
    color: "#045DDB",
    fontWeight: "bold"
  },
  paragraph: {
    textAlign: "left",
  },
  input: {
    fontSize: 15,
    color: colors.black_color,
    fontWeight: "bold",
  },
  contactView: {
    paddingBottom: 15,
  },
  float: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15
  },
  gift: {
    marginTop: 20,
    width: DEVICE_WIDTH - 40,
    height: 196,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 40,
    padding: 22,
  },
  cardGift: {
    flexDirection: "row",
  },
  headerGift: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleGift: {
    fontSize: 23,
    lineHeight: 27,
    color: "#FF4242",
    fontWeight: "bold",
    paddingLeft: 7,
    justifyContent: "center",
  },
  combo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  comboText: {
    fontSize: 15,
    color: colors.black_color,
    fontWeight: "700",
  },
  duration: {
    fontSize: 15,
    color: colors.black_color,
    paddingLeft: 5,
  },
  button: {
    backgroundColor: colors.background_white,
    width: 186,
    height: 34,
    borderRadius: 30,
    shadowColor: "rgba(0, 0, 0, 0.13)",
    marginTop: 20,
    borderBottomColor: colors.white_color,
    marginBottom: 50,
    shadowColor: "rgba(0, 0, 0, 0.13)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
    shadowOpacity: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.black_color,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
