import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Text } from "react-native-paper";
import colors from "../configs/colors";

const Box = ({ value, style, onPress, children }) => (
  <TouchableOpacity style={[styles.box, style]} onPress={onPress}>
    <Text style={styles.text}>{value}</Text>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    borderRadius: 13,
    width: wp('70%'),
    height: hp('8%'),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp('2%'),
    backgroundColor: 'linear-gradient(109.59deg, rgba(156, 156, 156, 0.5) 0%, rgba(167, 239, 255, 0.5) 100.08%)',
    // shadowColor: "rgba(0, 0, 0, 0.2)",
    // shadowOffset: {
    //   width: 0,
    //   height: 4
    // },
    // elevation: 10,
    // shadowOpacity: 10,
  },
  text: {
    fontSize: hp('1.7%'),
    fontWeight: "normal",
    color: colors.white_text,
    lineHeight: 15,
    letterSpacing: 0.02,
    textAlign: "center"
  }
});

export default memo(Box);
