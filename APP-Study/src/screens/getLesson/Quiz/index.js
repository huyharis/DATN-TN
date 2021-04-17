import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { QuizLesson } from ".@assets";
import * as Animatable from "react-native-animatable";
import Styles from "./styles.js";
import Service from "@services";
import Loading from "@components/loading";
import Icon from "react-native-vector-icons/FontAwesome5";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Bài Học Và Kiểm Tra",
    headerLeft: (
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={() => navigation.openDrawer()}
      >
        <Icon name="bars" size={25} color={"white"} />
      </TouchableOpacity>
    ),
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" }
  });
  componentDidMount(){
    Service.getQuizDetail(`5ddc170806a7a105c9d8d100`).then(data =>{
      console.log(data)
    }).then(err =>console.log(err))
  }
  render() {
  
    return (
      <View style={{ flex: 1, backgroundColor: "#FFE082" }}>
       
      </View>
    );
  }
}

export default Detail;
