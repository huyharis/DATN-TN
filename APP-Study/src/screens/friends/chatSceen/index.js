import React, { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import EIcon from "react-native-vector-icons/Entypo";
import McIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IMGIcon from "react-native-vector-icons/FontAwesome5";
import styles from "./style";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ChatScreen = ({ naviagtion }) => {
  const [isLoading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");
  return (
    <View style={styles.chatContainer}>
      <LinearGradient
        colors={["#2c2c2c", "#2c2c2c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity style={{ paddingLeft: 10 }}>
          <Icon name="chevron-left" color="#FFF" size={25} />
        </TouchableOpacity>
      </LinearGradient>
      <Text>User name here</Text>
      <TouchableOpacity style={{ marginRight: 15 }}>
        <EIcon name="dots-three-horizontal" color="#FFF" size={25} />
      </TouchableOpacity>
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
            renderItem={({ item }) => {
              if (item.msg.indexOf("https://") != -1) {
                setCheck(!check);
              }
              if (user.id == item.user?.id) {
                return; // messageComponent
              } else {
                return; // your messageComponent
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
          <Icon name="send" color="#029adb" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
