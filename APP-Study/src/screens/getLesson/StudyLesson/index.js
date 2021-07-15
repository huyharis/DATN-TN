import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground
} from "react-native";
import * as Speech from "expo-speech";
import * as Animatable from "react-native-animatable";
import Styles from "./styles.js";
import Service from "@services";
import Loading from "@components/loading";
import ActionModal from "@components/actionModal";
import Icon from "react-native-vector-icons/FontAwesome5";
import Swiper from "react-native-swiper";
import FlipCard from "react-native-flip-card";
import { showMessage, hideMessage } from "react-native-flash-message";

class StudyLesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Học Để Kiểm Tra",
    headerTintColor: "white",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" },
    headerRight: (
      <TouchableOpacity
        onPress={navigation.getParam("submitCreateCourse")}
        style={{ marginRight: 10 }}
      >
        <Icon name="graduation-cap" size={25} color={"white"} />
      </TouchableOpacity>
    )
  });
  submitCreateCourse = () => {
    this.props.navigation.navigate("DetailLesson", {
      id: this.props.navigation.getParam("id")
    });
  };
  componentDidMount() {
    this.setState({ loading: true });

    Service.getDetailLesson(this.props.navigation.getParam("id"))
      .then(data => {
        data ? this.setState({ data: data.vocabularies }) : null;
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });

        console.log(err);
      });
    this.props.navigation.setParams({
      submitCreateCourse: this.submitCreateCourse
    });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFE082" }}>
        <Swiper>
          {data.length !== 0 &&
            data.map((val, index) => {
              return (
                <FlipCard
                  key={index}
                  friction={6}
                  perspective={1000}
                  flipHorizontal={true}
                  flipVertical={false}
                  flip={false}
                  clickable={true}
                >
                  <ImageBackground
                    source={{ uri: val.avatar }}
                    style={styles.slide1}
                  >
                    <View
                      style={{
                        backgroundColor: "#FF6D00",
                        width: 300,
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={Styles.text}>{val.text}</Text>
                    </View>
                  </ImageBackground>

                  <ImageBackground
                    source={{ uri: val.avatar }}
                    style={styles.slide1}
                  >
                    <View
                      style={{
                        backgroundColor: "#FF6D00",
                        width: 300,
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text style={Styles.text}>{val.meaning}</Text>
                    </View>
                  </ImageBackground>
                </FlipCard>
              );
            })}
        </Swiper>
        {loading && <Loading />}
      </View>
    );
  }
}

export default StudyLesson;
