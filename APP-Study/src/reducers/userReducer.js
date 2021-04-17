import * as typeAction from "@actions/typeAction";
import Storage from "@storages";

initialState = {
  user: {},
  noti: [],
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case typeAction.GET_USER:
      return { ...state, user: action.user };
    case typeAction.GET_NOTI:
      return { ...state, noti: action.noti };
    case typeAction.ADD_NOTI:
      const { noti } = action;
      const stateNotify = state.noti.filter(i => i._id !== noti._id);
      return { ...state, noti: [action.noti, ...stateNotify] };
    default:
      return state;
  }
}
