import React, { memo, useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import {
  Card,
  Avatar,
  Text as TextElements,
  Button,
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import FilterImage from "helpers/filterImage";
import { useDispatch } from 'react-redux'

import WebService from "../../services";

// import Paragraph from "../components/Paragraph";
import Background from "../../components/Background";

// import { Button as PaperButton } from "react-native-paper";
import BackButton from "../../components/BackButton";
// import { Token, User } from "../storages";
import styles from "./styles";
import Storage from '@storages'
import { UserACtion } from "@actions/userAction";
import LoadingPage from '../loading';
import { getErrorMessage } from '../../untils/helper';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getMe = async () => {
    setIsLoading(true);
    try {
      const response = await WebService.getMe();
      setUser(response);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger"
      });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getMe();
  }, []);

  const _onLogoutPressed = () => {
    Storage.clearAll();
    navigation.navigate("Login");
  };

  const hanldeEditPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.2
    });

    if (result.cancelled) {
      showMessage({
        message: "Bạn chưa chọn ảnh xong",
        type: "danger"
      });
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let typeFile = match ? `image/${match[1]}` : `image`;

    if (!FilterImage(typeFile)) {
      showMessage({
        message: "Chỉ chọn ảnh jpg,png",
        type: "danger"
      });
      return;
    }
    let avatar = new FormData();
    avatar.append("avatar", {
      uri: localUri,
      name: filename,
      type: "image/jpeg"
    });
    
    try {
      setIsLoading(true);
      const data = await WebService.putAvartar(avatar);
      await Storage.saveUserInfo({
        username: data.username,
        email: data.email,
        avatar: data.avatar
      });
      dispatch(UserACtion.getUser());
      showMessage({
        message: "Sửa Avatar Thành Công",
        type: "success"
      });
    } catch(error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger"
      });
    }
    setIsLoading(false);
  };

  return (
    <Background>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <BackButton goBack={() => navigation.goBack()} />

        <Card containerStyle={styles.card}>
          <Avatar
            size={79}
            rounded
            containerStyle={styles.avatar}
            source={
              user.avatar
                ? { uri: user.avatar }
                : require("../../assets/images/avatar_user.png")
            }
            onEditPress={hanldeEditPress}
            showEditButton={true}
          />

          <TextElements h4 h4Style={styles.title}>
            {user.name || user.username || ''}
          </TextElements>
          {/* <Title style={styles.title}></Title> */}

          {/* <Paragraph children="Email" style={styles.paragraph}/> */}
          <Text style={styles.paragraph}>Email</Text>
          <Text style={styles.input}>{user ? user.email : ""}</Text>

          <View style={styles.float}>
            <View style={{ flex: 7 }}>
              <Text style={styles.paragraph}>Ngày sinh</Text>
              {/* <Paragraph children="Birth Date" style={styles.paragraph}/> */}
              <Text style={styles.input}>Oct 25, 1857</Text>
            </View>

            <View style={{ flex: 3 }}>
              <Text style={styles.paragraph}>Giới tính</Text>
              {/* <Paragraph children="Gender" style={styles.paragraph}/> */}
              <Text style={styles.input}>Nam</Text>
            </View>
          </View>

          {/* <Paragraph children="Contact Number" style={styles.paragraph}/> */}
          <Text style={styles.paragraph}>Số điện thoại</Text>
          <Text style={styles.input}>(+84) 1654 452 124</Text>
        </Card>

        {/* <Card style={styles.gift}>
          <View style={styles.headerGift}>
            <Image size={55} source={require("../assets/gift.png")} />
            <Title style={styles.titleGift}>Gift</Title>
          </View>
          <View style={styles.combo}>
            <Text style={styles.comboText}>CGV Combo ticket</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image width={10} source={require("../assets/duration.png")} />
              <Text style={styles.duration}>1 day left</Text>
            </View>
          </View>
        </Card> */}

        <TouchableOpacity style={styles.button} onPress={_onLogoutPressed}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>

      <LoadingPage loading={isLoading} />
    </Background>
  );
};
ProfileScreen.navigationOptions = {
  header: null,
};

export default ProfileScreen;
