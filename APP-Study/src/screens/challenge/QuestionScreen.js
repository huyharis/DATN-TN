import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
import { Audio } from "expo-av";
import { showMessage } from "react-native-flash-message";

import { Title } from "react-native-paper";
import { Avatar } from "react-native-elements";

import { backgroundLv1, WAR_WHITE } from "../../assets";
import Paragraph from "../../components/Paragraph";
import Background from "../../components/Background";
import PaperText from "../../components/PaperText";
import ButtonPaper from "../../components/ButtonPaper";
import ModalBox from "../../components/ModalBox";
import Answer from "./components/answer";
import styles from "./styles";
import Navigator from "@navigation/Navigator";
import WebService from "../../services";
import { Host } from "../../services/host";
import Loadding from "../../components/loading";
import {
  getInfoRooms,
  emitAnswerWar,
  getTimeCountDown,
  endGame,
} from "../../services/socketIO";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";

import Storage from "@storages";

const QuestionScreen = ({ navigation }) => {
  // const [quiz, setQuiz] = useState(initialValue);
  const [current, setCurrent] = useState({});
  const [time, setTime] = useState(20);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [data, setData] = useState([]);
  const [room, setRoom] = useState({});
  const [user, setUser] = useState(null);
  const [correct, setCorrect] = useState({});

  const onChoose = async (choice) => {
    const user = await Storage.getUserInfo();
    setUser(user);
    let point = score;

    if (choice !== current.answer) {
      if (!room?.room) {
        Navigator.navigate("ScoreScreen", { score: score });
        return;
      }
      if (score !== 0) point = score - 5;
    } else {
      point = score + 5;
    }

    setCorrect({
      index: choice,
      value: choice !== current.answer,
    });

    setScore(point);

    if (room?.room) {
      let dataEmit = room;

      if (room?.user1?._id === user.id) {
        if (choice === current.answer) {
          dataEmit = {
            ...room,
            user1: { ...room.user1, score: room.user1.score + 5 },
          };
        } else {
          if (room.user1.score !== 0) {
            dataEmit = {
              ...room,
              user1: { ...room.user1, score: room.user1.score - 5 },
            };
          }
        }
      } else {
        if (choice === current.answer) {
          dataEmit = {
            ...room,
            user2: { ...room.user2, score: room.user2.score + 5 },
          };
        } else {
          if (room.user1.score !== 0) {
            dataEmit = {
              ...room,
              user2: { ...room.user2, score: room.user2.score - 5 },
            };
          }
        }
      }

      // if (room?.user1?._id === user.id && choice === current.answer) {
      //   dataEmit = {
      //     ...room,
      //     user1: { ...room.user1, score: room.user1.score + point },
      //   };
      // } else {
      //   dataEmit = {
      //     ...room,
      //     user2: { ...room.user2, score: room.user2.score + point },
      //   };
      // }
      emitAnswerWar(dataEmit);
    }

    setTimeout(() => {
      nextQuestion();
      setCorrect({});
    }, 1500);

    // setTime(15);
  };

  const nextQuestion = () => {
    setCurrent(data[questionNumber + 1]);
    setQuestionNumber(questionNumber + 1);
    if (questionNumber + 1 === 10 && !room?.room) {
      setQuestionNumber(1);
      getChallenge(current.level + 1);
    }
  };

  const openAudio = async (url) => {
    try {
      const playbackObject = await Audio.Sound.createAsync(
        { uri: `${Host}/assets/challenge/audio/${url}` },
        { shouldPlay: true }
      );
      await playbackObject.playAsync();
    } catch (error) {
      // Alert.alert("Lỗi khi phát audio");
    }
  };

  const onBack = () => {
    Alert.alert("Thông báo", "Bạn chắc chắn muốn thoát", [
      { text: "OK", onPress: () => Navigator.navigate("ChallengeScreen") },
      {
        text: "Cancel",

        style: "cancel",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const startGame = () => {
    // setVisible(true);
    // setTimeout(() => {
    //   setVisible(false);
    // }, 2000);
    setInterval(
      () => setTime((prevState) => ({ time: prevState.time + 1 })),
      1000
    );
  };

  const getChallenge = async (level) => {
    try {
      setLoading(true);
      const response = await WebService.getChallengeByLevel(level);
      setData(response);
      setCurrent(response[0]);
    } catch (error) {
      showMessage({
        message: err,
        type: "danger",
      });
    }
    setLoading(false);
  };

  const getChallengeWar = async () => {
    try {
      setLoading(true);
      const response = await WebService.getQuestions();
      setData(response);
      setCurrent(response[0]);
    } catch (error) {
      showMessage({
        message: err,
        type: "danger",
      });
    }
    setLoading(false);
  };

  const getInfoRoom = (info) => {
    // console.log(info);
    setRoom(info);
  };

  useEffect(() => {
    // if (time == initialValue.time && !visible) {
    //   startGame();
    // }
    let interval;
    if (!time) {
      // if(room) {
      //   endGame(gameFinish);
      // }
      clearInterval(interval);
      // props.navigation.navigate("ScoreScreen", { score: 1});
      navigation.navigate("ScoreScreen", { score: score });
    }
    interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const gameFinish = (data) => {
    navigation.navigate("ScoreScreen", { data: data });
  };

  useEffect(() => {
    if (room?.room) {
      getChallengeWar();
    } else {
      getChallenge(1);
    }
  }, []);

  useEffect(() => {
    getInfoRooms(getInfoRoom);
  }, [room]);

  // useEffect(() => {
  //   getTimeCountDown(setTime);
  // }, []);

  // useEffect(() => {

  // });

  useEffect(() => {
    return () => endGame;
  });

  // let scoreWar = {
  //   if()
  // }

  if (loading) {
    return <Loadding />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <PaperText style={styles.textWhite}>
            {`Level ${current?.level}`}
          </PaperText>
          <View style={styles.time}>
            <PaperText style={styles.textWhite}>{time}</PaperText>
          </View>
          <View style={styles.coin}>
            <Image width={10} source={require("../../assets/coin.png")} />
            <PaperText style={styles.textWhite}>{score}</PaperText>
          </View>
        </View>
        {room?.room && (
          <ViewHorizontal style={styles.infoContainer}>
            <View style={styles.info}>
              <Avatar
                rounded
                source={{
                  uri: room?.user1?.avatar,
                }}
                size="medium"
              />
              <PaperText style={styles.textWhite}>
                {room?.user1?.username}
              </PaperText>
            </View>

            <View style={styles.score}>
              <Image source={WAR_WHITE} style={styles.iconWar} />
              <PaperText style={styles.textScore}>
                {room?.user1?.score} - {room?.user2?.score}
              </PaperText>
            </View>

            <View style={styles.info}>
              <Avatar
                rounded
                source={{
                  uri: room?.user2?.avatar,
                }}
                size="medium"
              />
              <PaperText style={styles.textWhite}>
                {room?.user2?.username}
              </PaperText>
            </View>
          </ViewHorizontal>
        )}

        <View style={styles.question}>
          <View style={styles.title}>
            <Title style={styles.titleText}>
              Question {questionNumber}/
              <PaperText style={styles.textWhite}>10</PaperText>
            </Title>
            {/* <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.change}
            >
              <Image width={10} source={require("../../assets/change.png")} />
              <PaperText text="Change" style={styles.textChange} />
            </TouchableOpacity> */}
          </View>
          <Image
            style={styles.image}
            source={{ uri: `${Host}/assets/challenge/photo/${current?.image}` }}
          />
          <PaperText
            text={
              current?.question
                ? current.question.replace(/&quot;/g, '"')
                : null
            }
            style={styles.questionText}
          />
        </View>

        <Answer
          value={current?.choice_1}
          openAudio={() => openAudio(current?.choice_1_voice)}
          choose={() => onChoose(1)}
          wrong={correct?.index === 1 ? correct?.value : undefined}
        />

        <Answer
          value={current?.choice_2}
          openAudio={() => openAudio(current?.choice_2_voice)}
          choose={() => onChoose(2)}
          wrong={correct?.index === 2 ? correct?.value : undefined}
        />

        <View style={styles.footer}>
          <ButtonPaper
            icon={({ size }) => (
              <Image
                source={require("../../assets/back.png")}
                style={{ width: size, height: size, tintColor: "#fff" }}
              />
            )}
            mode="text"
            onPress={onBack}
            style={styles.btnBack}
          >
            <Paragraph children={"Back"} style={styles.textButton} />
          </ButtonPaper>
        </View>
      </View>
      <ModalBox isVisible={visible} onClose={() => setVisible(false)}>
        <View style={{ flex: 1 }}>
          <Title style={styles.titleModal}>Level {current?.level}</Title>
        </View>
        <View style={styles.trick}>
          <Text style={styles.trickText}>.</Text>
        </View>
        <View style={styles.trick2}></View>
      </ModalBox>
    </Background>
  );
};

QuestionScreen.navigationOptions = {
  header: null,
};

export default QuestionScreen;
