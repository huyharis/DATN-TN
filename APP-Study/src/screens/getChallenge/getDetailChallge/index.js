import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { connect } from "react-redux";
import Loading from "@components/loading";
import Service from "@services";
import { showMessage, hideMessage } from "react-native-flash-message";
import { QuizLesson } from "@assets";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Audio } from "expo-av";
import Dialog from "react-native-dialog";
import Styles from "./styles";

class GetChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      fasleGame: false,
      winGame: false,
      imfomation: ""
    };
    this.audioPlayer = new Audio.Sound();
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Thử Thách",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" },
    headerTintColor: "white"
  });
  componentWillUnmount() {}

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    const id = this.props.navigation.getParam("id_chal");
    console.log("id nhan dc", id);
    Service.getDetailChanll(id)
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _handleGoToDetail = id => {};
  _handleSound = async url => {
    try {
      const playbackObject = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      await playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };
  _handleSound2 = async url => {
    try {
      const playbackObject = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      await playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };
  _handleChosse = text => {
    let { data, winGame, fasleGame } = this.state;
    if (text === data.answer) {
      this.setState({ winGame: true, imfomation: "thắng" });
      showMessage({
        message: "Bạn đã trả lời đúng",
        type: "success"
      });
    } else {
      showMessage({
        message: "Bạn đã trả lời sai",
        type: "danger"
      });
      this.setState({ winGame: true, imfomation: "thua" });
    }
  };
  handleCancel=() =>{
    this.setState({ winGame: false });
  }
  handleDelete=() =>{
    this.setState({ winGame: false });
  }
  render() {
    const { data, winGame, fasleGame, imfomation } = this.state;
    console.log(data.question);
    return (
      <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
        {winGame ? (
          <View>
            <Dialog.Container visible={winGame}>
              <Dialog.Title>Thông Báo</Dialog.Title>
              <Dialog.Description>
                {data.explanation
                  ? data.explanation.replace(/&quot;/g, '"')
                  : "Giải Thích"}
              </Dialog.Description>
              <Dialog.Button label="Kết Thúc" onPress={this.handleCancel} />
            </Dialog.Container>
          </View>
        ) : (
          data && (
            <View style={{ flex: 1 }}>
              <View style={Styles.container}>
                <Image
                  resizeMode={"contain"}
                  style={{ width: "80%", height: 200 }}
                  source={{
                    uri: data.image
                  }}
                ></Image>
                <Text
                  style={{ color: "red", fontSize: 20, textAlign: "center" }}
                >
                  {data.question ? data.question.replace(/&quot;/g, '"') : null}
                </Text>
              </View>
              <View
                style={{ padding: 30, backgroundColor: "#FCE4EC", flex: 1 }}
              >
                <View style={Styles.containerButton}>
                  <TouchableOpacity
                    style={Styles.button}
                    onPress={() => this._handleChosse(1)}
                  >
                    <Text>{data.choice_1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._handleSound(data.choice_1_voice)}
                    style={Styles.iteam}
                  >
                    <Icon
                      name="volume-up"
                      color="red"
                      size={20}
                      style={{ marginRight: 10, marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 50,
                    justifyContent: "space-around"
                  }}
                >
                  <TouchableOpacity
                    style={Styles.button}
                    onPress={() => this._handleChosse(2)}
                  >
                    <Text>{data.choice_2}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this._handleSound2(data.choice_2_voice)}
                    style={Styles.iteam}
                  >
                    <Icon
                      name="volume-up"
                      color="red"
                      size={20}
                      style={{ marginRight: 10, marginLeft: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        )}
      </View>
    );
  }
}

export default GetChallenge;
