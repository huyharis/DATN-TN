import { createStackNavigator } from "react-navigation-stack";
import Lesson from "./lesson";
import DetailLesson from "../getLesson";
import StudyLesson from "../getLesson/StudyLesson";


export default createStackNavigator(
  { Lesson,DetailLesson,StudyLesson},
  {
    initialRouteName: "Lesson"
  }
);
