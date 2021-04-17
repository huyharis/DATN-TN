import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import * as Speech from "expo-speech";
import { QuizLesson } from "@assets";
import * as Animatable from "react-native-animatable";
import Styles from "./styles.js";
import Service from "@services";
import Loading from "@components/loading";
import ActionModal from "@components/actionModal";
import Icon from "react-native-vector-icons/FontAwesome5";
import { showMessage, hideMessage } from "react-native-flash-message";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: [],
      life: 5,
      timer: 20,
      quizPlay: {},
      totalQuiz: 0,
      righQuiz: [],
      currentQuiz: 0,
      endQuiz: false,
      visible: true,
      endTotalQuiz: 0,
      falseGame: false,
      visibleLost: true,
      loading: false,
      history: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Bài Học Và Kiểm Tra",
    headerTintColor: "white",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" }
  });

  componentDidMount() {
    console.log("params ne", this.props.navigation.getParam("id"));
    this.setState({ loading: true });
    Service.getQuizDetail(this.props.navigation.getParam("id"))
      .then(data => {
        let arr=[];
        this.setState({
          quizData: data,
          quizPlay: data[0],
          totalQuiz: data.length,
          endQuiz: false,
          endTotalQuiz: data.length,
          loading: false
        });
        data.map((val,index)=>{
          arr.push(val.answer_id)
      
         })
         this.setState({righQuiz:arr})
         
      })
  
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });

    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  }
  _handleSpeech = text => {
    Speech.speak(text, { language: `ja` });
  };
  _hanldeAnsew = (index, id) => {
    let {
      righQuiz,
      currentQuiz,
      quizData,
      totalQuiz,
      endTotalQuiz,
      life,
      history
    } = this.state;
    //het mang
    if (life === 0) {
      console.log("win", history);
      this.setState({ falseGame: true });
      clearInterval(this.interval);
      showMessage({
        message: "Ban Bị Thua Game",
        type: "danger"
      });
      return;
    }
    //tl dung
    console.log("index",index,righQuiz[currentQuiz])

    if (index === righQuiz[currentQuiz]) {
      //win game
      if (currentQuiz === totalQuiz - 1) {
        clearInterval(this.interval);
        this.setState({ endQuiz: true });
        console.log("win", history);
        return;
      }
      clearInterval(this.interval);

      showMessage({
        message: "Ban Đã Trả Lời Đúng",
        type: "success"
      });
      console.log(currentQuiz);
      currentQuiz += 1;
      console.log("dung");
      this.interval = setInterval(
        () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
        1000
      );
      const correctpush = {
        _id: id,
        correct: true
      };
      history.push(correctpush);
      this.setState({
        quizPlay: quizData[currentQuiz],
        currentQuiz,
        endTotalQuiz: endTotalQuiz - 1,
        timer: 20,
        history
      });
    }
    //t; sai
    else {
      showMessage({
        message: "Ban Đã Trả Lời Sai",
        type: "danger"
      });
      this.setState({ life: life - 1 });
    }
  };
  _handleActionEnd = () => {
    this.setState({ visible: false });
  };
  _handleCancelModalEnd = () => {
    this.setState({ visible: false });
  };
  _handleActionEndLost = () => {
    this.setState({ visibleLost: false });
  };
  _handleCancelModalEndLost = () => {
    const { quizData } = this.state;
    this.setState({
      life: 5,
      timer: 20,
      quizPlay: quizData[0],
      totalQuiz: quizData.length,
      endQuiz: false,
      falseGame: false,
      endTotalQuiz: quizData.length
    });
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer - 1 })),
      1000
    );
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer } = this.state;
    if (prevState.timer === 0) {
      this.setState({ falseGame: true });
      clearInterval(this.interval);
    }
    if (prevState.endQuiz) {
      clearInterval(this.interval);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { timer, history } = this.state;
    if (
      nextState.timer === 0 ||
      nextState.endQuiz === true ||
      nextState.falseGame === true
    ) {
      let data = {
        topic: this.props.navigation.getParam("id"),
        answers: history
      };
      Service.setHistory(data)
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
      console.log("gui api", data);
    }
    console.log("win chua", nextState.falseGame);
    return true;
  }
  render() {
    const {
      righQuiz,
      quizData,
      life,
      timer,
      quizPlay,
      totalQuiz,
      endQuiz,
      visible,
      endTotalQuiz,
      falseGame,
      visibleLost,
      loading
    } = this.state;
    
    return (
      <View style={{ flex: 1, backgroundColor: "#FFE082" }}>
        {endQuiz ? (
          <ActionModal
            _handleCancelModal={this._handleCancelModalEnd}
            _handleAction={this._handleActionEnd}
            visible={visible}
            title={"Bạn Đã tháng Trò Chơi"}
            content={``}
            nameAction={"Kết Thúc"}
          />
        ) : falseGame || life === 0 ? (
          <ActionModal
            _handleCancelModal={this._handleCancelModalEndLost}
            _handleAction={this._handleActionEndLost}
            visible={visibleLost}
            title={"Bạn Đã Thua Trò Chơi"}
            content={``}
            nameAction={"Kết Thúc"}
            titleCancle={"Chơi Lại"}
          />
        ) : (
          <View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {totalQuiz !== 0 ? (
                <TouchableOpacity
                  style={{
                    height: 70,
                    width: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderColor: "red",
                    borderWidth: 5,
                    borderRadius: 30,
                    marginTop: 10
                  }}
                  onPress={() => this._handleSpeech(quizPlay.question)}
                >
                  <Text style={{ fontSize: 25 }}>{quizPlay.question}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text>
                      Số Mạng: <Text style={{ color: "red" }}>{life} </Text>
                    </Text>
                    <Text>
                      Thời Gian: <Text style={{ color: "red" }}>{timer}s </Text>
                    </Text>
                    <Text>
                      Số Câu:{" "}
                      <Text style={{ color: "red" }}>{endTotalQuiz}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>

            <View
              style={{
                width: "100%",
                height: 400,
                marginTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {totalQuiz !== 0
                ? quizPlay.answers.map((value, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: "45%",
                          height: "50%",
                          borderColor: "green",
                          margin: 5,
                          borderWidth: 5,
                          borderRadius: 10,
                          backgroundColor: "white"
                        }}
                        onPress={() => this._hanldeAnsew(index, value._id)}
                      >
                        <Image
                          resizeMode={"contain"}
                          style={{ width: "100%", height: "100%" }}
                          source={{ uri: value.answer }}
                        ></Image>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </View>
          </View>
        )}
        {loading && <Loading />}
      </View>
    );
  }
}

export default Detail;
