import { createStackNavigator } from "react-navigation-stack";
import AlphabetScreen from './index';
import AlphabetDetail from './components/AlphabetDetail'

export default createStackNavigator(
  {
    AlphabetScreen,
    AlphabetDetail
  },
  {
    initialRouteName: "AlphabetScreen",
    headerMode: "none",
    mode: "modal",
  }
);
