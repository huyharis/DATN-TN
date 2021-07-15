import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ListItem, Header, Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import Navigator from "@navigation/Navigator";
import Storage from '@storages'
import Loading from "@components/loading";
import { UserACtion } from "@actions/userAction";
import { showMessage, hideMessage } from "react-native-flash-message";
import FilterImage from "helpers/filterImage";
import Api from "@services";
import styles from "./styles";
import Logo from "../../components/Logo";

function Drawer(props) {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const moveScreen = (index, screen) => {
    setActive(!active)
    Navigator.navigate(screen);
  };
  // useEffect(() => {
  //   props.dispatch(UserACtion.getUser());
  // });
  const list = [
    {
      id: "1",
      title: "ホームページ",
      subtitle: 'Trang chủ',
      onPress: () => moveScreen(1, "DashBoard"),
      icon: "home"
    },
    {
      id: "2",
      title: "自己紹介ページ",
      subtitle: 'Trang cá nhân',
      icon: "user-circle",
      onPress: () => moveScreen(2, "Profile")
    },
    {
      id: "3",
      title: "フレンズ",
      subtitle: 'Bạn bè',
      icon: "clipboard-list",
      onPress: () => moveScreen(3, "Friends")
    },
    {
      id: "4",
      title: "スコアボード",
      subtitle: 'Bảng thành tích',
      icon: "clipboard-list",
      onPress: () => moveScreen(4, "LeaderBoard")
    },
    {
      id: '6',
      title: 'アルファベット',
      subtitle: 'Danh sách chủ đề',
      icon: 'clipboard-list',
      onPress: () => moveScreen(5, 'Topic')
    },
    {
      id: "7",
      title: "ログアウト",
      subtitle: 'Đăng xuất',
      icon: "sign-out-alt",
      onPress: () => {
        moveScreen(6, "Logout");
      }
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
        {/* <Text style={{color: '#000', fontSize: 18}}>Japanese Learning</Text> */}
      </View>
      <ScrollView style={styles.scrollVew} showsVerticalScrollIndicator={false}>
        {list.map((item, i) => {
          return (
            <TouchableOpacity key={i} onPress={item.onPress}>
              <ListItem
                containerStyle={styles.listItem}
                titleStyle={styles.titleItem}
                subtitleStyle={styles.subtitleItem}
                title={item.title}
                subtitle={item.subtitle}
                leftIcon={<Icon name={item.icon} size={17} color={"#707D82"} />}
              // bottomDivider
              // chevron={<Icon name={"chevron-right"} color={"#707D82"} />}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.UserReducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Drawer);
Drawer.defaultProps = {
  user: {}
};
Drawer.propTypes = {
  user: PropTypes.object
};
