import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import FlipCard from "react-native-flip-card";
import Styles from "./styles";

export default function GetCourses(props) {
  return (
    <Swiper style={Styles.swiperContainer}>
      {props.data.map((value, index) => {
        return(<FlipCard
          key={index}
          friction={6}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}
          clickable={true}
          style={Styles.cardContainer}
        >
          {/* Face Side */}
          <View style={Styles.slide1}>
            <Text style={Styles.text}>{value.text}</Text>
          </View>
          {/* Back Side */}
          <View style={Styles.slide1}>
            <Text style={Styles.text}>{value.mean}</Text>
          </View>
        </FlipCard>);
      })}
    </Swiper>
  );
}
