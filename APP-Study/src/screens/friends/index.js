import { createStackNavigator } from "react-navigation-stack";
import Friend from "./friend";

export default createStackNavigator(
  { Friend },
  {
    initialRouteName: "Friend",
  }
);
