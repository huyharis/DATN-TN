import * as typeAction from "@actions/typeAction";
import Storage from "@services";

initialState = {
  data: [],
  loading: false,
  error: ""
};
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case typeAction.IS_LOADING_LOGIN:
      return { ...state, loading: true, error: "" };
    case typeAction.LOGIN_SUCCESS:
      return { ...state, loading: false, data:action.data };
      case typeAction.LOGIN_FALSED:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
