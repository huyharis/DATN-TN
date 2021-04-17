import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../../../configs/colors";
import Icon from "../../../components/Icon";
import Box from "../../../components/Box";

const Answer = ({ value, openAudio, choose, wrong = "" }) => {
  return (
  <View style={styles.anwsers}>
    <Box value={value} style={styles.boxAnwser} onPress={choose}>
      {wrong === true && (
        <Icon name="close" size={40} color="red" style={styles.icon} />
      )}
      {wrong === false && (
        <Icon name="checkmark" size={40} color="green" style={styles.icon} />
      )}
    </Box>
    <Box value={"nghe"} style={styles.boxAudio} onPress={openAudio}>
      <Icon name="volume-high" color="#fff" />
    </Box>
  </View>
)};
const styles = StyleSheet.create({
  anwsers: {
    paddingTop: hp("1%"),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "auto",
  },
  anwserText: {
    color: colors.white_text,
    fontSize: hp("2%"),
    lineHeight: hp("2%"),
    letterSpacing: 0.02,
    textAlign: "center",
  },
  boxAnwser: {
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    shadowColor: "rgba(255, 255, 255, 0.2)",
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // elevation: 10,
    // shadowOpacity: 10
  },
  boxAudio: {
    width: wp("15%"),
    height: hp("8%"),
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});
export default Answer;
