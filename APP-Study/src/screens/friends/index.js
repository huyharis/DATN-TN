import { createStackNavigator } from "react-navigation-stack";
import Friend from "./friend";
import ChatScreen from "./chatSceen";

export default createStackNavigator(
  {
    Friend,
  },
  {
    initialRouteName: "Friend",
  }
);
