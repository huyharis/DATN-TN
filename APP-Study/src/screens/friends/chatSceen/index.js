import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import EIcon from "react-native-vector-icons/Entypo";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IMGIcon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import { LinearGradient } from "expo-linear-gradient";
import storage from "../../../storages";
import MyMessage from "./message/myMessage";
import YourMessage from "./message/yourMessage";

const ChatScreen = ({ navigation }) => {
  console.log(
    "🚀 ~ file: index.js ~ line 16 ~ ChatScreen ~ navigation",
    navigation
  );
  const [isLoading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  const [icon, setIcon] = useState([]);
  const [data, setData] = useState([]);
  const friendInfo = navigation.state?.params;

  const onSendMsg = async (src) => {
    let idUser = await storage.getUserInfo();
    setMsg("");
  };

  const goBack = () => {
    navigation.navigate("Friends");
  };

  return (
    <View style={styles.chatContainer}>
      <LinearGradient
        colors={["#fff", "#2c2c2c"]}
        start={{ x: 10, y: 10 }}
        end={{ x: 50, y: 50 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={goBack} style={{ paddingLeft: 10 }}>
          <Icon name="chevron-left" color="#2c2c2c" size={25} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "#2c2c2c",
            fontWeight: "bold",
            paddingLeft: 10,
          }}
        >
          {friendInfo?.username}
        </Text>
      </LinearGradient>

      <View
        style={
          isLoading
            ? {
                backgroundColor: "#FFF",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
                width: "100%",
                height: "100%",
              }
            : {
                backgroundColor: "#FFF",
                width: "100%",
                height: "100%",
                paddingBottom: 150,
              }
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            inverted
            data={data}
            renderItem={({ item }) => {
              if (item.msg.indexOf("https://") != -1) {
                setCheck(!check);
              }
              if (user.id == item.user?.id) {
                return <MyMessage item={{ ...item, check }} />;
              } else {
                return <YourMessage item={{ ...item, check }} />;
              }
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
      <View style={styles.sendMessage}>
        <TouchableOpacity>
          <McIcon name="emoticon-excited-outline" color="#999" size={26} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IMGIcon name="images" color="#999" size={25} />
        </TouchableOpacity>
        <TextInput
          value={msg}
          onChangeText={(value) => {
            setMsg(value);
          }}
          placeholder="Nhập tin nhắn ..."
          style={{ width: "60%" }}
        />
        <TouchableOpacity>
          <Icon name="send" color="#029adb" size={25} onPress={onSendMsg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
