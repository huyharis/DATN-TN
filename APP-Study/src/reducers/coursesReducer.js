import * as typeAction from "@actions/typeAction";

initialState = {
  data: [],
  loading: false,
  error: ""
};
export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case typeAction.IS_LOADING_COURSES:
      return { ...state, loading: true, error: "" };
    case typeAction.GET_COURSES:
      return { ...state, loading: false, data: action.data };
    case typeAction.GET_COURSES_FALSED:
      return { ...state, loading: false, error: action.error };
    case typeAction.DELETE_COURESE:
      let newState = { ...state.data };
   
      const result = newState.courses.filter(
        data => data._id !== action.id
      );
      newState.courses = result;

      return { ...state, data:newState};
    default:
      return state;
  }
}
