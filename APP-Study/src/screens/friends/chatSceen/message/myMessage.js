import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const MyMessage = (props) => {
  const { item } = props;
  const [imageCheck, setImageCheck] = useState(false);

  const renderMsg = () => {
    // if (item.msg.indexOf("https://") != -1) {
    // return (
    //   <Image style={{ width: 100, height: 100, borderRadius: 25 }} source />
    // );
    // } else {
    return <Text style={{ color: "black", fontSize: 14 }}>{item.msg}</Text>;
    // }
  };

  // useEffect(() => {
  //   if (item.item.indexOf("https://") != -1) {
  //     setImageCheck(true);
  //   }
  // });

  const renderTime = () => {
    let date = new Date();
    let dateNew = `${date.getDay()}th${date.getMonth() + 1
      },${date.getFullYear()} Lúc ${date.getHours()}:${date.getMinutes()}`;
    return dateNew;
  };

  return (
    <View
      style={{
        justifyContent: "flex-end",
        flexDirection: "row",
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <View>
        <View
          style={{
            ...styles.messageStyle,
            // backgroundColor: item.check ? "#FFF" : "#f1eff2",
          }}
        >
          {renderMsg()}
        </View>
        <Text
          style={{
            fontSize: 10,
            textAlign: "right",
            color: "rgba(34,34,34,0.3)",
          }}
        >
          {renderTime()}
        </Text>
      </View>
    </View>
  );
};

export default MyMessage;

const styles = StyleSheet.create({
  messageStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 7,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    maxWidth: 300,
  },
});
