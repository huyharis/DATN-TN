import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const YourMessage = (props) => {
  const { item, avatar } = props;
  const renderMsg = () => {
    // if (item.msg.indexOf("https://" != -1)) {
    // return (
    //   <Image
    //     style={{ width: 100, height: 100, borderRadius: 25 }}
    //   // source={{ uri: item.item }}
    //   />
    // );
    // } else {
    return <Text style={{ color: "#000", fontSize: 14 }}>{item.msg}</Text>;
    // }
  };

  const renderTime = () => {
    // const time = item.dateSent;
    const time = '2021/01/01';
    let date = new Date(time);
    let dateNew = `${date.getDay()}th${date.getMonth() + 1
      },${date.getFullYear()} Lúc ${date.getHours()}:${date.getMinutes()}`;

    return dateNew;
  };

  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: avatar }}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>
          {item?.users?.name}
        </Text>
        <View
          style={{
            ...styles.messageStyle,
            backgroundColor: "#00a1e1",
          }}
        >
          {renderMsg()}
        </View>
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: "rgba(34,34,34,0.3)",
          }}
        >
          {renderTime()}
        </Text>
      </View>
    </View>
  );
};

export default YourMessage;

const styles = StyleSheet.create({
  messageStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginLeft: 7,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderTopEndRadius: 20,
    borderBottomRightRadius: 20,
    maxWidth: 200,
  },
});
