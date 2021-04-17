import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Settings from './src/components/screens/Settings'; //Tab Nav
import BottomTabNavigator from './bottomTabNavigator';
import Logout from '@screens/logout'
import Drawer from '@screens/drawer'
import ProfileScreen from '@screens/profile';
import LeaderBoardScreen from '@screens/leaderBoard';
import Challenge from '../screens/challenge';
import DashBoardScreen from '../screens/dash-board'
import NotificationList from '../screens/notification-list';
import FriendsScreen from '../screens/friends/friend';
import GetCourse from '../screens/getCourse';
import StudyTopicScreen from '../screens/studyToTopic';
import MemmoryCard from '../screens/games/memmoryCard'
import ChoiceTestScreen from '../screens/course-test/choice-test';
import Lesson from '../screens/lesson';
import AlphabetScreen from '../screens/alphabet'
import WritingTestScreen from '../screens/course-test/writing-test';
import MemoryCardScreen from '../screens/getCourse/memoryCard';
import HistoryScreen from '../screens/history';
import MyTopicScreen from '../screens/studyToTopic/myTopic'
import AddTopicScreen from '../screens/studyToTopic/addTopic';
import PronounceScreen from '../screens/pronounce';
import FinishTestScreen from '../screens/course-test/finishTest';

const DrawerNavigatorConfig = {
  initialRouteName: 'DashBoard',
  drawerPosition: 'left',
  contentComponent: Drawer,
  drawerType:'back'
};
const config = {
  mode: "modal",
  headerMode: "none"
};

const TopicStackNavigator = createStackNavigator({
  ListTopic: {
    screen: StudyTopicScreen
  },
  MyTopicScreen: {
    screen: MyTopicScreen
  },
  AddTopicScreen: {
    screen: AddTopicScreen
  }
}, config)

const CourseStackNavigator = createStackNavigator({
  GetCourse: {
    screen: GetCourse
  },
  MemmoryCard: {
    screen: MemmoryCard
  },
  ChoiceTestScreen: {
    screen: ChoiceTestScreen
  },
  WritingTestScreen: {
    screen: WritingTestScreen
  },
  MemoryCardScreen: {
    screen: MemoryCardScreen
  },
  HistoryScreen: {
    screen: HistoryScreen
  },
  PronounceScreen: {
    screen: PronounceScreen
  },
  FinishTestScreen: {
    screen: FinishTestScreen
  }
}, config)

export default createDrawerNavigator(
  {
    // HomeDrawer: {
    //   screen: BottomTabNavigator,
    // },
    Profile: {
      screen: ProfileScreen
    },
    LeaderBoard: {
      screen: LeaderBoardScreen
    },
    Logout: {
      screen: Logout,
    },
    Challenge: {
      screen: Challenge
    },
    DashBoard: {
      screen: DashBoardScreen
    },
    Notifications: {
      screen: NotificationList
    },
    Friends: {
      screen: FriendsScreen
    },
    Course: {
      screen: CourseStackNavigator
    },
    Topic: {
      screen: TopicStackNavigator,
    },
    Lesson: {
      screen: Lesson
    },
    Alphabet: {
      screen: AlphabetScreen
    },
    
    // MyTopicScreen: {
    //   screen: MyTopicScreen
    // },
    // AddTopicScreen: {
    //   screen: AddTopicScreen
    // }
  },
  DrawerNavigatorConfig,
);
