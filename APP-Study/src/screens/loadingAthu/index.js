import React, { Component } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import Storage from "@storages";
import api from "@services/base";
import Navigator from "@navigation/Navigator";
import { UserACtion } from "@actions/userAction";
import { connect } from "react-redux";
import { startSocketIO, socketInitial } from "../../services/socketIO";

class Athu extends Component {
  constructor(props) {
    super(props);
    this.checkAthu();
  }
  checkAthu = async () => {
    const token = await Storage.getToken();
    const user = await Storage.getUserInfo();
    if (token) {
      api.init({ token });
      socketInitial(user.id);
      // startSocketIO(user);
      // emitStartGame();
      this.props.dispatch(UserACtion.getUser());

      Navigator.navigate("Main");
    } else {
      Navigator.navigate("Auth");
    }
  };
  render() {
    return <View></View>;
  }
}
// const mapStateToProps = (state, ownProps) => {
//     return {
//       user: state.UserReducer.user
//     };
//   };

export default connect(null, null)(Athu);
