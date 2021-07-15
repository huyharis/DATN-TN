import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Title, Button, Text } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import Background from "../components/Background";
import Paragraph from "../components/Paragraph";
import Logo from "../components/Logo";
import colors from "../configs/colors";
import Navigator from "@navigation/Navigator";
import WebService from '../services';
import Storage from '../storages';

const ScoreScreen = ({ route, navigation }) => {
  useEffect(() => {
    WebService.updateHightMark({ challenge: navigation?.getParam('score') })
      .then(res => res)
      .catch(err => alert(err))
  }, [navigation?.getParam('score')])

  const data = navigation?.getParam('data');

  const user = Storage.getUserInfo();

  const winOrLose = (data) => {
    if (data?.user1.win === data?.user2.win) {
      return 'both';
    }
    if (data?.user1?._id === user.id) {
      if (data?.user1?.win) {
        return 'win'
      }
      return 'lose'
    } else {
      if (data?.user2?.win) {
        return 'win'
      }
      return 'lose'
    }
  }

  const getScore = (data) => {
    if (data?.user1?._id === user.id) {
      return data?.user1?.score + ' - ' + data?.user2?.score
    }
    return data?.user2?.score + ' - ' + data?.user1?.score
  }

  return (
    <Background>
      <View style={styles.container}>
        <Logo style={styles.logo} />

        {!data ?
          <>
            <View style={styles.card}>
              <Title>Time out</Title>
              <Title>Game Over</Title>
              <Paragraph children={navigation?.getParam('score')} style={styles.point} />
              <View style={styles.trick}>
                <Text style={styles.trickText}>.</Text>
              </View>
              <View style={styles.trick2}></View>
            </View>

            <Paragraph children={"Your Ranking: 4"} style={styles.paragraph} />
          </>
          : (
            <View style={styles.card}>
              <Title>Time out</Title>
              <Title>Game Over</Title>
              <Paragraph children={getScore(data)} style={styles.point} />
              <Paragraph children={`You ${winOrLose(data)}`} style={styles.point} />
              <View style={styles.trick}>
                <Text style={styles.trickText}>.</Text>
              </View>
              <View style={styles.trick2}></View>
            </View>
          )
        }

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 270,
            marginTop: 20
          }}
        >
          <Button
            style={styles.btnClose}
            mode="contained"
            onPress={() => navigation.navigate("DashBoard")}
          >
            <Text
              style={{ fontWeight: "bold", color: "rgba(244, 144, 12, 0.8)" }}
            >
              Close
            </Text>
          </Button>
          <Button
            style={styles.btnPlay}
            mode="contained"
            onPress={() => navigation.navigate("ChallengeScreen")}
          >
            <Text style={{ fontWeight: "bold", color: colors.white_color }}>
              Play Again
            </Text>
          </Button>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "absolute",
    top: hp("5%")
  },
  card: {
    backgroundColor: colors.white_color,
    height: 250,
    width: 270,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  paragraph: {},
  btnClose: {
    flex: 2,
    backgroundColor: colors.white_color,
    borderRadius: 10,
    marginRight: 15,
    padding: 5
  },
  btnPlay: {
    flex: 4,
    backgroundColor: "rgba(244, 144, 12, 0.8)",
    borderRadius: 10,
    padding: 5
  },
  text: {
    fontWeight: "bold"
  },
  point: {
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 40
  },
  trick: {
    width: "80%",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10
  },
  trick2: {
    width: "50%",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10
  },
  trickText: {
    position: "absolute",
    top: -13,
    left: "45%",
    backgroundColor: "#fff",
    width: 20,
    textAlign: "center",
    fontWeight: "bold"
  }
});

ScoreScreen.navigationOptions = {
  header: null
};

export default ScoreScreen;
