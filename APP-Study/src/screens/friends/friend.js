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
import { war, ic_arrow_back } from "../../assets";
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
import RequestFriend from './request';

import styles from "./styles";

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
        <TouchableOpacity onPress={() => inviteWar(item._id)}>
          <Image source={war} style={styles.war} resizeMode="contain" />
        </TouchableOpacity>
      }
    />
  );

  const inviteWar = async (id) => {
    setLoading(true);
    try {
      const response = await WebService.inviteFriend({ friend_id: id });
      if (response) {
        setRoomId(response);
        setIsVisible(true);
        const receiver = friends.filter((item) => item._id === id);
        setReceiver(receiver[0]);
      }
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setLoading(false);
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
    console.log('requestFriends', requestFriends, !requestFriends);
    
    return requestFriends ? (
      <FlatList
        keyExtractor={keyExtractor}
        data={requestFriends}
        renderItem={renderItemRequest}
        refreshing={isRefreshing}
        onRefresh={() => onRefresh()}
        onEndReachedThreshold={0}
      />
    ) :  <Text style={{textAlign: 'center'}}>Bạn không có lời mời nào</Text>
  };

  const addFriend = (id, request) => {
    setLoading(true);
    setIsRefreshing(true)
    WebService.addFriend({ friend_id: id, is_request: request })
      .then(async (data) => {
        search(text);
        showMessage({
          message: "Kết bạn thành công",
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
    setIsRefreshing(false)
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
            <Text style={styles.btnTextAccept}>Đồng ý</Text>
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
        mainText={"Bạn bè"}
        stylesHeader={styles.header}
        leftComponent={
          <Image source={ic_arrow_back} style={styles.backarrow} />
        }
        leftAction={() => navigation.goBack()}
      />

      <View style={styles.headerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Danh sách"
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
            title="Tìm kiếm"
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
            title="Lời mời"
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
  title: "Bạn bè",
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
