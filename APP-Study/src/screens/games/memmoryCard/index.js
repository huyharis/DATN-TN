import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import Loading from "components/loading";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome5";
import ActionModal from "@components/actionModal";
import PropTypes from "prop-types";
function uniqueid() {
  // always start with a letter (for DOM friendlyness)
  var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  do {
    // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
    var ascicode = Math.floor(Math.random() * 42 + 48);
    if (ascicode < 58 || ascicode > 64) {
      // exclude all chars between : (58) and @ (64)
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);

  return idstr;
}
const data = [
  {
    id: uniqueid(),
    text: "11",
    mean: "1"
  },
  {
    id: uniqueid(),

    text: "22",
    mean: "2"
  },
  {
    id: uniqueid(),

    text: "33",
    mean: "3"
  },
  {
    id: uniqueid(),

    text: "44",
    mean: "4"
  },
  {
    id: uniqueid(),

    text: "55",
    mean: "5"
  }
];

shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

objectToArray = data => {
  let arrText = [];
  let arrMean = [];
  data.map((val, index) => {
    arrText.push({
      id: val._id,
      text: val.text,
      isText: true,
      active: false
    });
    arrMean.push({
      id: val._id,

      text: val.mean,
      isText: false,
      active: false
    });
  });
  return shuffle([...arrText, ...arrMean]);
};
var count = 0;
var countColor = 0;
export default class GetCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEnd: false,
      visible: true,
      timer: 0,
      data: objectToArray(this.props.navigation.getParam("data")),
      text: "",
      mean: "",
      realData: this.props.navigation.getParam("data"),
      press: "",

      start: false
    };
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.

  static navigationOptions = ({ navigation }) => ({
    title: "Game Ghi Nhớ Thẻ",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" },
    headerTintColor: "white"
  });
  _handleCancelModalEnd = () => {
    this.setState({
      visibleEnd: false,
      data: objectToArray(this.props.navigation.getParam("data")),
      timer: 0,
      text: "",
      mean: "",
      press: ""
    });
    clearInterval(this.interval);
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer + 1 })),
      1000
    );
  };
  _handleActionEnd = () => {
    clearInterval(this.interval);
    this.setState({
      visibleEnd: false
    });
  };
  _handleCancelModal = () => {
    this.setState({
      visible: false
    });
  };

  _handleAction = () => {
    this.interval = setInterval(
      () => this.setState(prevState => ({ timer: prevState.timer + 1 })),
      1000
    );
    this.setState({
      visible: false,
      start: true
    });
  };


  componentWillUnmount() {
    clearInterval(this.interval);
  }
  _handleCheck = async (data, index) => {
    count++;
    countColor++;
    this.setState({ press: index });
    if (countColor === 2) {
      this.setState({ press: "" });
      countColor = 0;
    }
    if (count > 2) {
      this.setState({ text: "", mean: "" });
      count = 0;
    }
    if (data.isText) {
      await this.setState({
        text: data.text
      });
    } else {
      await this.setState({ mean: data.text });
    }

    const { text, mean, realData } = this.state;
    console.log("text", text);
    console.log("mean", mean);
    console.log("count", count);
    // const id = data.id;
    realData.map(async (val, index) => {
      if (val.text === text && val.mean === mean) {
        console.log("ok", count);
        let { data } = this.state;
        console.log("id filter", val._id);
        const resuilt = data.filter(valdata => valdata.id !== val._id);
        count = 0;
        console.log(resuilt);
        await this.setState({ data: resuilt });
        const dataEnd = this.state.data;
        if (dataEnd.length === 0) {
          clearInterval(this.interval);
          this.setState({ visibleEnd: true });
        }
        return;
      }
    });
  };
  render() {
    const { visible, start, timer, data, press, visibleEnd } = this.state;
    console.log(visible);
    return (
      <View style={{ flex: 1 }}>
        {!start ? null : (
          <View>
            <Text
              style={{ color: "#D50000", fontSize: 30, textAlign: "center" }}
            >
              Thời Gian:{timer} s
            </Text>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {data
                  ? data.map((val, index) => {
                      if (val.active) return null;
                      else
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => this._handleCheck(val, index)}
                          >
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 130,
                                width: 80,
                                backgroundColor:
                                  press === index ? "red" : "#E65100",
                                borderRadius: 15,
                                margin: 2
                              }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 20,
                                  textAlign: "center"
                                }}
                              >
                                {val.text}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                    })
                  : null}
              </View>
            </ScrollView>
            <ActionModal
              _handleCancelModal={this._handleCancelModalEnd}
              _handleAction={this._handleActionEnd}
              visible={visibleEnd}
              title={"Bạn Đã tháng Trò Chơi"}
              content={`Số Giây:  ${timer} `}
              nameAction={"Kết Thúc"}
              titleCancle={"Chơi Lại"}
            />
          </View>
        )}
        <ActionModal
          _handleCancelModal={this._handleCancelModal}
          _handleAction={this._handleAction}
          visible={visible}
          title={"Trò Chơi Ghi Nhớ Thẻ"}
          content={"Bạn có Muốn Bắt Đầu"}
          nameAction={"Bắt Đầu"}
        />
      </View>
    );
  }
}
