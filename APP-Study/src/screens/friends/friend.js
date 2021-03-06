import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
  RefreshControl,
} from "react-native";
import * as Speech from "expo-speech";
import { QuizLesson } from "@assets";
import * as Animatable from "react-native-animatable";
// import Styles from "./styles.js";
import WebService from "../../services";
// import Loading from "@components/loading";
import ActionModal from "@components/actionModal";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import { ListItem, Input, Avatar } from "react-native-elements";
import { TabView, SceneMap } from "react-native-tab-view";
import SecondRoute from "./request";
import { onStartGame } from "../../services/socketIO";
import { war, ic_arrow_back, message_icon } from "../../assets";
import LoadingPage from "../loading";
import { getErrorMessage } from "../../untils/helper";
import ModalBox from "../../components/ModalBox";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";
import Header from "../../components/header";
import Button from "../../components/Button";
import ModalWar from "./modalWar";
import SearchRoute from "./search";
import RequestFriend from "./request";
// import socket from "socket.io";

import styles from "./styles";
import storage from "../../storages";

// const initialLayout = { width: Dimensions.get("window").width };

const FriendsScreen = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [requestFriends, setRequestFriends] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [timeWait, setTimeWait] = useState(30);
  const [currentSelect, setCurrentSelect] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <ListItem
      title={item.username}
      subtitle={item.isOnline ? "Online" : "Offline"}
      leftAvatar={{
        source: item.avatar && { uri: item.avatar },
        // title: item.name[0],
      }}
      subtitleStyle={{ color: item.isOnline ? "green" : "grey" }}
      bottomDivider
      // chevron
      rightTitle={
        <TouchableOpacity onPress={() => chatRoom(item)}>
          <Icon name="comment" size={15} style={styles.war} />
        </TouchableOpacity>
      }
    />
  );

  const chatRoom = async (item) => {
    let idUser = await storage.getUserInfo();
    try {
      const data = await WebService.joinRoom([idUser.id, item._id])
      if (data.msg === "successed") {
        navigation.navigate("Chat", { item: item, user: idUser, dataRoom: data });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getList = async () => {
    setLoading(true);
    setIsRefreshing(true);
    try {
      const data = await WebService.getFriends();
      setFriends(data.friends);
      setRequestFriends(data.requestFriend);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }

    setIsRefreshing(false);
    setLoading(false);
  };

  const FirstRoute = () => (
    <FlatList
      keyExtractor={keyExtractor}
      data={friends}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={() => onRefresh()}
      onEndReachedThreshold={0}
    />
  );

  const ThirdRoute = () => {
    return requestFriends ? (
      <FlatList
        keyExtractor={keyExtractor}
        data={requestFriends}
        renderItem={renderItemRequest}
        refreshing={isRefreshing}
        onRefresh={() => onRefresh()}
        onEndReachedThreshold={0}
      />
    ) : (
      <Text style={{ textAlign: "center" }}>B???n kh??ng c?? l???i m???i n??o</Text>
    );
  };

  const addFriend = (id, request) => {
    setLoading(true);
    setIsRefreshing(true);
    WebService.addFriend({ friend_id: id, is_request: request })
      .then(async (data) => {
        search(text);
        showMessage({
          message: "K???t b???n th??nh c??ng",
          type: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        showMessage({
          message: getErrorMessage(err),
          type: "danger",
        });
        setLoading(false);
      });
    setIsRefreshing(false);
  };

  const renderItemRequest = ({ item }) => {
    return (
      <ListItem
        keyExtractor={keyExtractor}
        title={item.username}
        leftAvatar={{
          source: item.avatar && { uri: item.avatar },
        }}
        subtitleStyle={{ color: "green" }}
        bottomDivider
        rightTitle={
          <TouchableOpacity
            onPress={() => addFriend(item._id, false)}
            style={styles.btnAcceptRequest}
          >
            <Text style={styles.btnTextAccept}>?????ng ??</Text>
          </TouchableOpacity>
        }
      />
    );
  };

  const search = (value) => {
    if (value == "") {
      return;
    }
    WebService.searchFriend(value)
      .then(async (data) => {
        setSearchFriends(data);
      })
      .catch((err) => {
        console.log("bi loi", err);
        showMessage({
          message: err,
          type: "danger",
        });
      });
  };

  const onRefresh = () => {
    getList();
  };

  const handleStart = (response) => {
    if (response) {
      setIsVisible(false);
      setTimeWait(20);
      navigation.navigate("QuestionScreen");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    onStartGame(handleStart);
  });

  return (
    <ViewVertical style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        mainText={"B???n b??"}
        stylesHeader={styles.header}
      />

      <View style={styles.headerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Danh s??ch"
            buttonStyle={[
              styles.buttonStyle,
              currentSelect === 0 && styles.buttonSelected,
            ]}
            titleStyle={[
              styles.titleStyle,
              currentSelect === 0 && styles.titleSelected,
            ]}
            onPress={() => setCurrentSelect(0)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="T??m ki???m"
            buttonStyle={[
              styles.buttonStyle,
              currentSelect === 1 && styles.buttonSelected,
            ]}
            titleStyle={[
              styles.titleStyle,
              currentSelect === 1 && styles.titleSelected,
            ]}
            onPress={() => setCurrentSelect(1)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="L???i m???i"
            buttonStyle={[
              styles.buttonStyle,
              currentSelect === 2 && styles.buttonSelected,
            ]}
            titleStyle={[
              styles.titleStyle,
              currentSelect === 2 && styles.titleSelected,
            ]}
            onPress={() => setCurrentSelect(2)}
          />
        </View>
      </View>

      {currentSelect === 0 && <FirstRoute />}
      {currentSelect === 1 && <SearchRoute />}
      {currentSelect === 2 && <RequestFriend />}

      <LoadingPage loading={loading} />
      <ModalWar
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        receiver={receiver}
        roomId={roomId}
        time={timeWait}
      />
    </ViewVertical>
  );
};

FriendsScreen.navigationOptions = ({ navigation }) => ({
  title: "B???n b??",
  headerLeft: (
    <TouchableOpacity
      style={{ paddingLeft: 10 }}
      onPress={() => navigation.openDrawer()}
    >
      <Icon name="bars" size={25} color={"black"} />
    </TouchableOpacity>
  ),
});

export default FriendsScreen;
