import * as typeAction from "@actions/typeAction";
import Storage from "@services";

initialState = {
  data: [],
  loading: false,
  error: ""
};
export default function register(state = initialState, action) {
  switch (action.type) {
    case typeAction.IS_LOADING_REGISTER:
      return { ...state, loading: true, error: "" };
    case typeAction.REGISTER_SUCCESS:
      return { ...state, loading: false, data:action.data };
      case typeAction.REGISTER_FALSED:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
