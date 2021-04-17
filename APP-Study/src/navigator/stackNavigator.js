import { createStackNavigator } from "react-navigation-stack";
import Drawer from "./drawerNavigator";
import Login from "../screens/login";
import Register from '../screens/register';
import NotificationList from '@screens/notification-list';

import LoadingAthu from "@screens/loadingAthu";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
const config = {
  mode: "modal",
  headerMode: "none"
};
const Main = createStackNavigator({ Drawer }, config);
const Auth = createStackNavigator({ Login, Register });
const app = createSwitchNavigator(
  {
    LoadingAthu,
    Main,
    Auth
  },
  {
    initialRouteName: "LoadingAthu",
    mode: "modal",
    headerMode: "none"
  }
);

export default createAppContainer(app);
