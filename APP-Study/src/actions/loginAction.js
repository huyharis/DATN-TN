import WebService from "@services";
import * as typeAction from "./typeAction";
import Storage from "@storages";
import { showMessage, hideMessage } from "react-native-flash-message";
import Navigator from "@navigation/Navigator";

export const LoginACtion = {
  loginRequest,
  loginSocial
};

loginSuccess = data => {
  return {
    type: typeAction.LOGIN_SUCCESS,
    data: data
  };
};
loginFalsed = data => {
  return {
    type: typeAction.LOGIN_FALSED,
    data: data
  };
};
function loginRequest(loginData) {
  return dispatch => {
    dispatch({ type: typeAction.IS_LOADING_LOGIN });
    WebService.login(loginData)
      .then(async data => {
      console.log("🚀 ~ file: loginAction.js ~ line 29 ~ loginRequest ~ data", data)
        await Storage.saveToken(data.token);
        await Storage.saveUserInfo({
          id: data._id,
          username: data.username,
          email: data.email,
          avatar: data.avatar
        });
        dispatch(loginSuccess(data));
        showMessage({
          message: "Đăng Nhập Thành công",
          type: "success"
        });
        Navigator.navigate("LoadingAthu");
      })
      .catch(err => {
        console.log("bi loi", err);
        showMessage({
          message: "Sai tài khoản hoặc mật khẩu",
          type: "danger"
        });
        dispatch(loginFalsed(err));
      });
  };
}

function loginSocial(loginData) {
  return dispatch => {
    dispatch({ type: typeAction.IS_LOADING_LOGIN });
    WebService.loginSocial(loginData)
      .then(async data => {
        await Storage.saveToken(data.token);
        await Storage.saveUserInfo({
          id: data._id,
          username: data.username,
          email: data.email,
          avatar: data.avatar
        });
        dispatch(loginSuccess(data));
        showMessage({
          message: "Đăng Nhập Thành công",
          type: "success"
        });
        Navigator.navigate("LoadingAthu");
      })
      .catch(err => {
        console.log("bi loi", err);
        showMessage({
          message: "Sai tài khoản hoặc mật khẩu",
          type: "danger"
        });
        dispatch(loginFalsed(err));
      });
  };
}
