import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import { Text, Title } from "react-native-paper";
import ButtonPaper from "./ButtonPaper";
import colors from '../configs/colors';
import Paragraph from "./Paragraph";

const ModalBox = ({ isVisible, onClose, style, children }) => (
  <Modal
    style={[styles.container, style]}
    isVisible={isVisible}
    animationIn="slideInLeft"
    animationOut="slideOutRight"
    onBackdropPress={onClose}
    animationInTiming={300}
    animationOutTiming={300}
  >
    {children}
    {/* <View style={{ flex: 1 }}>
      <Title style={styles.titleText}>{title}</Title>
      <Text style={styles.content}>{content}</Text>
      <Button mode="text" onPress={onClose} style={styles.doneButton}>
        <Paragraph children={"Done"} style={styles.textButton} />
      </Button>
    </View> */}
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 0,
    width: wp("70%"),
    // height: hp("10%"),
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
    shadowOpacity: 0.15,
    position: "absolute",
    top: hp("25%"),
    left: wp("15%")
  },
  
  content: {
    textAlign: "center",
    fontSize: hp("2.7%"),
    letterSpacing: 0.02,
    fontWeight: "300"
  },
  doneButton: {
    marginTop: hp("2.5%"),
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    borderRadius: 30,
    width: wp("50%"),
    height: hp("6%"),
    alignContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    // elevation: 1,
    shadowOpacity: 0.15
  },
  textButton: {
    color: colors.white_text,
    fontWeight: "normal",
    fontSize: hp("3%"),
    lineHeight: hp("3%"),
    textTransform: "none",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  }
});

export default memo(ModalBox);
