import WebService from "@services";
import * as typeAction from "./typeAction";
import Storage from "@storages";
import { showMessage, hideMessage } from "react-native-flash-message";
import Navigator from "@navigation/Navigator";
import { ActionSheetIOS } from "react-native";

export const UserACtion = {
  getUser,
  getNoti,
  addNoti
};
function getUser() {
  return {
    type: typeAction.GET_USER,
    user: Storage.getUserInfo()
  };
}
function getNoti(data) {
  return {
    type: typeAction.GET_NOTI,
    noti: data
  }
}
function addNoti(data) {
  return {
    type: typeAction.ADD_NOTI,
    noti: data
  }
}
