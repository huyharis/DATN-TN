import WebService from '../services';
import * as typeAction from "./typeAction";
import Storage from "@storages";
import { showMessage, hideMessage } from "react-native-flash-message";
import Navigator from "@navigation/Navigator";

export const CoursesACtion = {
  _getCoursesRequest,
  _deleteCourses
};

_getCoursesSuccess = data => {
  return {
    type: typeAction.GET_COURSES,
    data: data
  };
};
_getCoursesFalsed = data => {
  return {
    type: typeAction.GET_COURSES_FALSED,
    data: data
  };
};
function _deleteCourses (id) {
  return {
    type: typeAction.DELETE_COURESE,
    id
  };
}
function _getCoursesRequest(id) {
  return dispatch => {
    dispatch({ type: typeAction.IS_LOADING_COURSES });
    WebService.getDetailCourses(id)
      .then(async data => {
        dispatch(_getCoursesSuccess(data));
      })
      .catch(err => {
        console.log("bi loi", err);
        showMessage({
          message: err,
          type: "danger"
        });
        dispatch(_getCoursesFalsed(err));
      });
  };
}
