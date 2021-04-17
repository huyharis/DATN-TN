import React from "react";
import { StyleSheet } from "react-native";

import { Avatar as AvatarComponent } from "react-native-elements";
// import { avatar_default } from "../assets";

const Avatar = ({ source, size, style }) => (
  <AvatarComponent
    size={size || 79}
    containerStyle={[styles.avatar, style]}
    source={
      { uri: source } || source  || require("../assets/images/avatar_user.png")
    }
    rounded
  />
);
const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
  },
});

export default Avatar;
