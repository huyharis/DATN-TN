import React, { Component } from "react";
import { Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";

import {
  ViewVertical,
  ViewHorizontal,
} from "../../../components/viewBox.component";
import Header from "../../../components/header";
import QuestionComponent from "./question";
import webservice from "../../../services";
import Loading from "../../loading";
import ModalScore from "./modalScore";

import { getErrorMessage } from "../../../untils/helper";
import { ic_arrow_back } from "../../../assets";
import styles from "./styles";

class ChoiceTestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuestions: [],
      answer: [],
      loading: false,
      isVisible: false,
      score: 0,
    };
  }
  chooseAnswer = (value, index, id, isCorrect) => {
    const { answer } = this.state;

    const correct = parseInt(value) === isCorrect ? 1 : 0;
    // console.log(parseInt(value) === isCorrect);
    // console.log(value, isCorrect);

    answer[index] = { value: value, content: id, rightAnwser: correct };

    this.setState({ answer });
  };

  getData = async (id) => {
    this.setState({ loading: true });
    try {
      const data = await webservice.getLearnByCourse(id);
      const answer = data.map(item => {
        return { _id: item._id, rightAnwser: 0 }
      })

      console.log('answeranswer', answer);
      

      this.setState({ listQuestions: data });
    } catch (error) { }
    this.setState({ loading: false });
  };

  onSubmit = async () => {
    const { answer, listQuestions } = this.state;
    const { navigation } = this.props;

    const score = answer.filter((item) => item.rightAnwser === 1).length;


    const id = navigation.getParam("idCourse");

    const body = {
      topic: id,
      contents: answer
    }

    try {
      const res = await webservice.setHistory(body);
      console.log(res);
      navigation.navigate('FinishTestScreen', { 
        idCourse: navigation.getParam('idCourse'), score, count: listQuestions.length }
      );
      
    } catch(error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }

    
    console.log(answer);

    this.setState({ score });
  };

  onReturn = () => {
    this.setState({ isVisible: false })
    const id = this.props.navigation.getParam("idCourse");
    this.getData(id);
  }

  backToCourse = () => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate('GetCourse')
  }

  componentDidMount() {
    const id = this.props.navigation.getParam("idCourse");

    this.getData(id);
  }

  componentWillReceiveProps(nextProps) {
    const idNext = nextProps.navigation.getParam("idCourse");
    const id = this.props.navigation.getParam("idCourse");

    if (idNext !== id) {
      this.getData(idNext);
    }
  }

  render() {
    const { answer, listQuestions, loading, isVisible, score } = this.state;

    // console.log(listQuestions);

    return (
      <ViewVertical style={{ flex: 1, backgroundColor: "#fff" }}>
        <Header
          noShadow={true}
          stylesHeaderText={{
            color: "#000",
            fontSize: 15,
            fontWeight: "bold",
          }}
          mainText={"Kiểm tra từ vựng"}
          stylesHeader={styles.header}
          leftComponent={
            <Image source={ic_arrow_back} style={styles.backarrow} />
          }
          leftAction={() => this.props.navigation.navigate('GetCourse')}
        />

        <ScrollView style={styles.container}>
          {listQuestions &&
            listQuestions.map((item, index) => (
              <QuestionComponent
                key={index}
                item={item}
                index={index}
                chooseAnswer={this.chooseAnswer}
                answer={answer[index]?.value}
              />
            ))}
          <ViewVertical style={styles.controlContainer}>
            <TouchableOpacity onPress={this.onSubmit} style={styles.btnSubmit}>
              <Text>Kết thúc</Text>
            </TouchableOpacity>
          </ViewVertical>
        </ScrollView>

        <Loading loading={loading} />
        {/* <ModalScore
          isVisible={isVisible}
          score={score}
          onReturn={this.onReturn}
          onClose={this.backToCourse}
          length={listQuestions?.length}
        /> */}
      </ViewVertical>
    );
  }
}

export default ChoiceTestScreen;
