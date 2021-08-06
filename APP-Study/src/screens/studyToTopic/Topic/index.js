import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/FontAwesome5";
import Loading from "@components/loading";
import PropTypes from "prop-types";
import { Avatar, Text } from "react-native-elements";
import ActionModal from "@components/actionModal";
import { showMessage, hideMessage } from "react-native-flash-message";
import { CoursesACtion } from "@actions/CoursesAction";
import { connect } from "react-redux";
import Navigator from "@navigation/Navigator";
import Service from "@services";
import Styles from "./styles";

function Topic(props) {
  const [visible, setVisible] = useState(false);

  _handleAction = () => {
    props._actionDeleteCourese(props.id)
    setVisible(false);
  };
  const _handleOnModal = () => {
    setVisible(true);
  };
  const _handleCancelModal = () => {
    setVisible(false);
  };
  const _handleToDetail = () => {
    props._handleGoToDetail(props.id)
  }
  const swipeoutBtns = [
    {
      component: (
        <TouchableOpacity style={Styles.icon}>
          <Icon name="pen" size={25} color={"white"}></Icon>
        </TouchableOpacity>
      )
    },
    {
      component: (
        <TouchableOpacity
          onPress={_handleOnModal}
          style={{ ...Styles.icon, backgroundColor: "#64DD17" }}
        >
          <Icon name="trash-alt" size={25} color={"white"}></Icon>
        </TouchableOpacity>
      )
    }
  ];
  return (
    <View>
      <Swipeout
        right={swipeoutBtns}
        backgroundColor={"white"}
        sensitivity={10}
        style={Styles.iteam}
      >
        <TouchableOpacity onPress={_handleToDetail} style={{ padding: 10 }}>
          <Text style={{ color: "#FF6F00", fontSize: 25, fontWeight: "bold" }}>
            {props.title}
          </Text>
          <Text style={{ fontSize: 15, color: "gray" }}>
            {props.lenght} Thuật Ngữ
          </Text>
          <Avatar
            size={20}
            activeOpacity={0.7}
            rounded
            source={{
              uri: props.avatar
            }}
          />
        </TouchableOpacity>
      </Swipeout>
      <ActionModal
        _handleCancelModal={_handleCancelModal}
        _handleAction={_handleAction}
        visible={visible}
        title={"Xóa"}
        content={"Bạn có Thật Sự Muốn Xóa"}
        nameAction={"Xóa"}
      />
    </View>
  );
}
export default connect(null, null)(Topic);
Topic.defaultProps = {
  courses: {}
};
Topic.propTypes = {
  courses: PropTypes.object,
  loading: PropTypes.bool,
  courses: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool
};
