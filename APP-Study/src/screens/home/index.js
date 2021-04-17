import { createStackNavigator } from "react-navigation-stack";
import Home from "./home";
import CreateCourse from "../createCourse";
import StudyToTopic from "../studyToTopic";
import GetCourese from "../getCourse";
import Language from "../language";
import MemmoryCard from "../games/memmoryCard";
import GetChallenge from "../getChallenge";
import GetDetailChallenge from "../getChallenge/getDetailChallge";
import NotificationList from "../notification-list";
import DashBoardScreen from '../dash-board';
import AlphabetScreen from '../alphabet';
import AlphabetDetail from '../alphabet/components/AlphabetDetail';

export default createStackNavigator(
  {
    Home,
    DashBoardScreen,
    CreateCourse,
    StudyToTopic,
    GetCourese,
    Language,
    MemmoryCard,
    GetChallenge,
    GetDetailChallenge,
    NotificationList,
    AlphabetScreen,
    AlphabetDetail
  },
  {
    initialRouteName: "DashBoardScreen",
    mode: 'modal',
    headerMode: 'screen'
  }
);
