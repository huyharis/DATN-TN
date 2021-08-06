import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { QuizLesson } from "@assets";
import * as Animatable from "react-native-animatable";
import Styles from "./styles.js";
import { showMessage, hideMessage } from "react-native-flash-message";
import Service from "@services";
import Loading from "@components/loading";
import Icon from "react-native-vector-icons/FontAwesome5";
class Lesson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      topic: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Bài Học Trắc Nghiệm",
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
  componentDidMount() {
    this.setState({ loading: true });
    Service.getTopic()
      .then(data => {
        this.setState({ topic: data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  _handleQuiz = (id, lock) => {
    if (lock) {
      showMessage({
        message: "Bạn Chưa Mở Khóa",
        type: "danger"
      });
      return
    }
    this.props.navigation.navigate('StudyLesson', { id })


  }
  render() {
    const { topic, loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFE082" }}>
        <Animatable.View
          iterationCount={5}
          direction="alternate"
          animation="slideInDown"
        >
          <Image
            resizeMode={"contain"}
            style={{ width: "100%", height: 90 }}
            source={QuizLesson}
          ></Image>
        </Animatable.View>
        <ScrollView>
          <View style={Styles.container}>
            {!topic
              ? null
              : topic.map((data, index) => {
                //  if (data.complete)
                return (
                  <TouchableOpacity
                    key={index}
                    style={Styles.topicGame}
                    onPress={() => this._handleQuiz(data._id, data.lock)}
                  >
                    <View>
                      <Text style={{ color: "white", fontSize: 15 }}>
                        {data.title}
                      </Text>
                      <View>
                        <Text style={{ color: "blue", fontSize: 8 }}>
                          Question: {data.sumQuestion}
                        </Text>
                        {/* <Text style={{ color: "white", fontSize: 10 }}>
                            Number Lesson: {data.lesson_number}
                          </Text> */}
                        {!data.lock ? (
                          <Icon
                            name="check"
                            size={20}
                            color={"green"}
                            style={{ textAlign: "center" }}
                          />
                        ) : (
                          <Icon
                            name="times"
                            size={20}
                            color={"red"}
                            style={{ textAlign: "center" }}
                          />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
                // else return(
                //   <TouchableWithoutFeedback
                //   key={index}
                //   onPress={() => this.bounce("createCourse")}
                // >
                //   <Animatable.View
                //     ref={this.handleViewRefcreateCourse}
                //     style={Styles.topicGame}
                //   >
                //     <Text style={{ color: "white", fontSize: 20 }}>

                //     </Text>
                //   </Animatable.View>
                // </TouchableWithoutFeedback>
                // )
              })}
          </View>
        </ScrollView>
        {loading && <Loading />}
      </View>
    );
  }
}

export default Lesson;
