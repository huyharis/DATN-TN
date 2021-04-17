import { createStackNavigator } from "react-navigation-stack";
import QuestionScreen from './QuestionScreen';
import ChallengeScreen from '../ChallengeScreen';
import ScoreScreen from '../ScoreScreen';

export default createStackNavigator(
  {
    ChallengeScreen,
    QuestionScreen,
    ScoreScreen
  },
  {
    initialRouteName: "ChallengeScreen",
    headerMode: "none",
    mode: "modal",
  }
);
