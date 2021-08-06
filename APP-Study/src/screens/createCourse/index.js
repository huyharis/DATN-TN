import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import Input from "@components/input";
import DraggableFlatList from "react-native-draggable-flatlist";
import { showMessage, hideMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "@components/loading";
import Icon from "react-native-vector-icons/FontAwesome5";
import Api from "@services";
import { SocialIcon } from "react-native-elements";
import Styles from "./styles";

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: false,
      delete: false,
      autoFocus: false,
      loading: false,
      titleCourse: "",
      erroTitle: "",
      data: [
        {
          id: guidGenerator(),
          valueText: "",
          valueDefine: "",
          erroText: "",
          erroDefine: "",
          language: "VietNamese",
          languageCode: "vi"

        },
        {
          id: guidGenerator(),
          valueText: "",
          valueDefine: "",
          erroText: "",
          erroDefine: "",
          language: "VietNamese",
          languageCode: "vi"
        }
      ]
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Tạo Học Phần",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" },
    headerTintColor: "white",

    headerRight: (
      <TouchableOpacity
        onPress={navigation.getParam("submitCreateCourse")}
        style={{ marginRight: 10 }}
      >
        <Icon name="check-circle" size={25} color={"white"} />
      </TouchableOpacity>
    )
  });
  validate = value => {
    if (value === "") return { status: false, mess: "Không được để chống" };
    return { status: true, mess: "Không được để chống" };
  };
  submitCreateCourse = () => {
    const { titleCourse, data } = this.state;
    const result = this.validate(titleCourse);

    if (!result.status) {
      this.setState({ erroTitle: result.mess });
      return;
    } else {
      this.setState({ erroTitle: "" });
    }
    let validate = true;
    let contentSubmit = [];
    data.map((item, index) => {
      const content = {
        text: item.valueText,
        mean: item.valueDefine,
        language: item.languageCode

      };
      const resultText = this.validate(item.valueText);
      const resultData = this.validate(item.valueDefine);
      if (!resultText.status) {
        data[index].erroText = resultText.mess;
        this.setState({ data });
        validate = false;
      } else {
        data[index].erroText = "";
        this.setState({ data });
      }
      if (!resultData.status) {
        data[index].erroDefine = resultData.mess;
        this.setState({ data });
        validate = false;
      } else {
        data[index].erroDefine = "";
        this.setState({ data });
      }
      contentSubmit.push(content);
    });
    if (!validate) return;
    const content = { title: titleCourse, content: contentSubmit };
    this.setState({ loading: true });
    Api.createCourse(content)
      .then(data => {
        this.setState({ loading: false });
        showMessage({
          message: "Tạo Học Phần Thành Công",
          type: "success"
        });
        this.props.navigation.navigate('StudyToTopic')
      })
      .catch(err => {
        this.setState({ loading: false });
        showMessage({
          message: "Tạo Học Phần Thất Bại",
          type: "danger"
        });
        return
      });
  };
  componentDidMount() {
    // set handler method with setParams
    this.props.navigation.setParams({
      submitCreateCourse: this.submitCreateCourse
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.navigation.getParam("language") !== nextProps.navigation.getParam("language")) {
      const { data } = this.state
      let language = nextProps.navigation.getParam("language")
      data.map((value, index) => {
        if (value.id === language.id) {
          value.language = language.name
          value.languageCode = language.code
        }
      })
      this.setState({
        data
      })

    }
  }

  handleOnTextChange = event => {
    this.setState({
      ...event
    });
  };
  handleOnDefineContent = event => {
    const { data } = this.state;
    data.map((item, index) => {
      if (item.id === event.id)
        item.valueDefine = event.valueDefine
    })
    this.setState({ data });
  };
  handleOnTextContent = event => {
    const { data } = this.state;
    data.map((item, index) => {
      if (item.id === event.id)
        item.valueText = event.valueText
    })
    // const result= data.filter((item => item.id === event.id))
    // data[event.id.toString()].valueText = event.valueText;
    this.setState({ data });
  };
  handleAddContent = () => {
    const { data } = this.state;
    data.push({
      id: guidGenerator(),
      valueText: "",
      valueDefine: "",
      erroText: "",
      erroDefine: ""
    });

    if (data.length > 2) this.setState({ delete: true });

    this.setState({ data, autoFocus: true });
  };
  handleDelete = id => {
    const { data } = this.state;
    const result = data.filter(item => item.id !== id);

    if (result.length <= 2) this.setState({ delete: false });
    this.setState({ data: result });
  };
  _handleLan = (id) => {
    this.props.navigation.navigate("Language", { id })
  }
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    handleMove = () => {
      return (move)
    }

    return (
      <TouchableOpacity
        style={{
          ...Styles.iteam,
          backgroundColor: isActive ? "#E1F5FE" : "white"
        }}
        onLongPress={this.handleMove}
        onPressOut={() => {
          moveEnd
        }}
      >
        {this.state.delete && (
          <TouchableOpacity
            onPress={() => this.handleDelete(item.id)}
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <Icon
              color={"gray"}
              name={"times-circle"}
              size={20}
              style={{ marginRight: 5, marginTop: 5 }}
            />
          </TouchableOpacity>
        )}
        <Input
          inputStyle={{ color: "black" }}
          inputContainerStyle={{ marginBottom: 10 }}
          label={"Thuật Ngữ"}
          stateName={{ id: item.id, value: `valueText` }}
          handleChange={this.handleOnTextContent}
          value={item.valueText}
          errorMessage={item.erroText}
          autoFocus={this.state.autoFocus}
          disabled={this.state.disable}
        />
        <Input
          inputStyle={{ color: "black" }}
          inputContainerStyle={{}}
          label={"Định Nghĩa"}
          stateName={{ id: item.id, value: `valueDefine` }}
          handleChange={this.handleOnDefineContent}
          value={item.valueDefine}
          errorMessage={item.erroDefine}
          disabled={this.state.disable}

        />
        <TouchableOpacity onPress={() => this._handleLan(item.id)} style={{ padding: 10 }}><Text style={{ color: "green" }}>Ngôn Ngữ:{item.language}</Text></TouchableOpacity>
      </TouchableOpacity>
    );
  };

  render() {
    const { data, erroTitle, loading } = this.state;
    return (
      <View style={Styles.container}>
        <TouchableOpacity onPress={this.handleAddContent} style={Styles.plus}>
          <Icon name="plus" size={35} color={"white"} />
        </TouchableOpacity>
        <View style={{ paddingBottom: 15 }}>
          <Input
            placeholderTextColor={"#263238"}
            inputStyle={{ color: "black" }}
            placeholder={"Tiêu Đề"}
            stateName={"titleCourse"}
            handleChange={this.handleOnTextChange}
            errorMessage={erroTitle}
          />
        </View>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={{ flex: 1 }}>
            <DraggableFlatList
              extraData={this.state}
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => `draggable-item-${item.id}`}
              scrollPercent={0}
              onMoveEnd={({ data }) => this.setState({ data })}
            />
          </View>
        </KeyboardAwareScrollView>
        {loading && <Loading />}
      </View>
    );
  }
}
export default Home;
