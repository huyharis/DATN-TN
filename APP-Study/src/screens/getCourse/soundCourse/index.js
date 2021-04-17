import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";
import * as Speech from "expo-speech";
import Styles from "./styles";

function SoundCourse(props) {
  const _speak = () => {
    var thingToSay = props.mean;
    Speech.speak(thingToSay,{language : 'ja'});
  };

  return (
    <View style={{ ...Styles.sound }}>
      <Text style={{ fontSize: 30 }}>{props.text}</Text>
      <Text style={{ fontSize: 20 }}>{props.mean}</Text>
      <TouchableOpacity style={Styles.soundIcon} onPress={_speak}>
        <Icon name="volume-up" color={"#76FF03"} size={20}></Icon>
      </TouchableOpacity>
    </View>
  );
}

SoundCourse.propTypes = {};

export default SoundCourse;
