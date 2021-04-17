import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Image,
  TouchableWithoutFeedback,
  Vibration,
  Platform
} from "react-native";
import { Icon } from 'react-native-elements';
import { banner, Dethi, Chude, TaoKhoaHoc } from "@assets";
import * as Animatable from "react-native-animatable";
// import Icon from "react-native-vector-icons/FontAwesome5";
import { Badge, withBadge } from 'react-native-elements'
// Push notification
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import WebService from "../../services";
import styles from "../drawer/styles";

class Home extends Component {
  constructor(props) {
    super(props);
  }
static navigationOptions = {
  header: null
}
  // static navigationOptions = ({ navigation }) => {
  //   const BadgedIcon = withBadge(1)(Icon);
  //   return {
  //     title: "Trang Chủ",
  //     headerLeft: (
  //       <TouchableOpacity
  //         style={{ paddingLeft: 10 }}
  //         onPress={() => navigation.openDrawer()}
  //       >
  //         <Icon type='ionicon' name="md-reorder" size={30} color={"white"} />
  //       </TouchableOpacity>
  //     ),
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{ paddingRight: 10, marginRight: 10 }}
  //         onPress={() => navigation.navigate("NotificationList")}
  //       >
  //         <BadgedIcon type="ionicon" name="md-notifications" color={"white"}/>
  //       </TouchableOpacity>
  //     ),
  //     headerTitleStyle: { color: "#ffffff", fontSize: 20 },
  //     headerStyle: { backgroundColor: "#536DFE", color: "white" },
  //   }};

  // push notification
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      try {
        token = await Notifications.getExpoPushTokenAsync();

        console.log("token Notification", token);
        await WebService.updateTokenNotify({ token: token});

        this.setState({ expoPushToken: token });
      } catch(error) {
        console.log(error)
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    this.props.navigation.navigate("NotificationList");
    
    // this.setState({ notification: notification });
  };


  handleViewRefTest = (ref) => (this.test = ref);
  handleViewRefcreateCourse = (ref) => (this.createCourse = ref);
  handleViewRefStudyToTopic = (ref) => (this.studyToTopic = ref);
  handleViewRefStudyToTopic = (ref) => (this.studyToTopic = ref);
  handleViewChallengeRun = (ref) => (this.challengeRun = ref);
  handleViewLeaderBoard = (ref) => (this.LeaderBoard = ref);
  bounce = (name) => {
    switch (name) {
      case "createCourse":
        this.createCourse.bounce(800).then((endState) => {
          console.log("GetCourese");
          this.props.navigation.navigate("CreateCourse");
        });
        break;
      case "GetCourese":
        this.GetCourese.bounce(800).then((endState) => {
          console.log("GetCourese");
          this.props.navigation.navigate("GetCourese");
        });
        break;
      case "test":
        this.test.bounce(800).then((endState) => {
          this.props.navigation.navigate("GetChallenge");
        });
        break;
      case "studyToTopic":
        this.studyToTopic.bounce(800).then((endState) => {
          this.props.navigation.navigate("StudyToTopic");
        });
        break;
      case "ChallengeScreen":
        this.challengeRun.bounce(800).then((endState) => {
          // console.log("GetCourese");
          this.props.navigation.navigate("ChallengeScreen");
        });
        break;
      case "LeaderBoardScreen":
        this.LeaderBoard.bounce(800).then((endState) => {
          // console.log("GetCourese");
          this.props.navigation.navigate("LeaderBoard");
        });
        break;
      default:
        break;
    }
  };
  render() {
    console.log("home");
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F3E5F5",
          }}
        >
          <Image
            resizeMode={'cover'}
            style={{ flex: 1, width: '100%', height: '50%' }}
            source={banner}
          ></Image>
        </View>
        <View style={{ flex: 4, backgroundColor: "#E0F2F1" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => this.bounce("test")}>
              <Animatable.View
                animation="zoomInUp"
                ref={this.handleViewRefTest}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 2,
                  backgroundColor: "red",
                  borderRadius: 15,
                  margin: 2,
                }}
              >
                <Image
                  style={{ width: "50%", height: "50%" }}
                  source={Dethi}
                ></Image>
                <Text style={{ color: "white", fontSize: 20 }}>Thử Thách</Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.bounce("studyToTopic")}
            >
              <Animatable.View
                ref={this.handleViewRefStudyToTopic}
                animation="fadeIn"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 4,
                  backgroundColor: "#64DD17",
                  borderRadius: 15,
                  margin: 2,
                }}
              >
                <Image
                  style={{ width: "30%", height: "50%" }}
                  source={Chude}
                ></Image>
                <Text style={{ color: "white", fontSize: 20 }}>
                  Học Theo Chủ Đề
                </Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableWithoutFeedback
              onPress={() => this.bounce("createCourse")}
            >
              <Animatable.View
                ref={this.handleViewRefcreateCourse}
                animation="bounceInUp"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  backgroundColor: "#F57C00",
                  borderRadius: 15,
                  margin: 2,
                }}
              >
                <Image
                  style={{ width: "50%", height: "50%" }}
                  source={TaoKhoaHoc}
                ></Image>
                <Text style={{ color: "white", fontSize: 20 }}>
                  Tạo Học Phần
                </Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
            <Animatable.View
              ref={this.handleCreateCourse}
              animation="bounceInUp"
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#F48FB1",
                borderRadius: 15,
                margin: 2,
              }}
            >
              <Image
                style={{ width: "50%", height: "50%" }}
                source={Chude}
              ></Image>
              <Text style={{ color: "white", fontSize: 20 }}>Chơi Game</Text>
            </Animatable.View>
            <Animatable.View
              animation="bounceInUp"
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: "#1A237E",
                borderRadius: 15,
                margin: 2,
              }}
            >
              <Image
                style={{ width: "50%", height: "50%" }}
                source={Chude}
              ></Image>
              <Text style={{ color: "white", fontSize: 20 }}>Chơi Game</Text>
            </Animatable.View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => this.bounce("ChallengeScreen")}>
              <Animatable.View
                ref={this.handleViewChallengeRun}
                animation="fadeIn"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 4,
                  backgroundColor: "#D500F9",
                  borderRadius: 15,
                  margin: 2,
                }}
              >
                <Image
                  style={{ width: "30%", height: "50%" }}
                  source={Chude}
                ></Image>
                <Text style={{ color: "white", fontSize: 20 }}>
                  Challenge Run !!
                </Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.bounce("LeaderBoardScreen")}>
              <Animatable.View
                ref={this.handleViewLeaderBoard}
                animation="zoomInUp"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 2,
                  backgroundColor: "#90CAF9",
                  borderRadius: 15,
                  margin: 2,
                }}
              >
                {/* <Image
                  style={{ width: "50%", height: "50%" }}
                  source={Dethi}
                ></Image> */}
                <Text style={{ color: "white", fontSize: 20 }}>Bảng xếp hạng</Text>
              </Animatable.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

export default Home;
