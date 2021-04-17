import WebService from "@services";
import * as typeAction from "./typeAction";
import Storage from "@storages";
import { showMessage, hideMessage } from "react-native-flash-message";
import Navigator from "@navigation/Navigator";

export const RegisterACtion = {
  registerRequest
};

registerSuccess = data => {
  return {
    type: typeAction.REGISTER_SUCCESS,
    data: data
  };
};
registerFalsed = data => {
  return {
    type: typeAction.REGISTER_FALSED,
    data: data
  };
};
function registerRequest(registerData) {
  return dispatch => {
    dispatch({ type: typeAction.IS_LOADING_REGISTER });
    console.log("reigister", registerData);
    WebService.register(registerData)
      .then(data => {
        dispatch(registerSuccess(data));
        Navigator.navigate("Login");
        showMessage({
          message: "Đăng ký thành công",
          type: "success"
        });
      })
      .catch(err => {
        console.log("bi loi", err);
        showMessage({
          message: "Đăng ký thất bại",
          type: "danger"
        });
        dispatch(registerFalsed(err));
      });
  };
}
