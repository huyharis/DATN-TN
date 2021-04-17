import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
// import { Title, Button, Text, IconButton } from "react-native-paper";
import { Text as TextElements } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { showMessage } from "react-native-flash-message";

import Background from "../components/Background";
// import Paragraph from "../components/Paragraph";
// import Logo from "../components/Logo";
import BackButton from "../components/BackButton";
// import { backgroundLv4 } from "../assets";
import Icon from "../components/Icon";
import colors from "../configs/colors";
import Button from '../components/Button';
import WebService from '../services';
import Loadding from '../components/loading';

const ChallengeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mark, setMark] = useState(0);

  const getHight = async () => {
    setLoading(true)
    try {
      const response = await WebService.getMe();
      const { markHight } = response
      
      setMark(markHight?.challenge || 0)
    }
    catch(error) {
      showMessage({
        message: error,
        type: "danger",
      });
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getHight()
  }, []);

  if(loading) {
    return <Loadding />
  }
  return (
    <Background source={require("../assets/backgroundLv4.png")}>
      <View style={styles.container}>
        <BackButton goBack={() => navigation.navigate("DashBoard")} />

        <TextElements h4 h4Style={{ textAlign: "center", fontWeight: "bold" }}>Challenge</TextElements>
        <TextElements h4 h4Style={{ textAlign: "center", fontWeight: "bold" }}>Now ...</TextElements>
        
        <Button
          style={styles.btnStart}
          mode="clear"
          onPress={() => navigation.navigate("QuestionScreen")}
          title="Get Started"
          iconRight
          icon={
            <Icon name="arrow-round-forward" color={colors.white_color} />
          }
          titleStyle={styles.btnText}
        >
        </Button>
        <Text style={styles.paragraph}>High Score: {mark}</Text>

      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: wp("2%")
    // backgroundColor: "rgba(244, 144, 12, 0.5)"
  },
  logo: {
    position: "absolute",
    top: hp("10%")
  },
  title: {
    color: colors.white_color,
    fontWeight: "bold",
    fontSize: 34,
    lineHeight: 40
  },
  subtitle: {
    color: colors.white_color,
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 40
  },
  paragraph: {
    marginTop: hp('4%'),
    color: colors.white_color,
    fontSize: 17
  },
  btnStart: {
    backgroundColor: "#AC8F86",
    width: '50%',
    marginTop: 10,
    borderRadius: 10,
    padding: 5
  },
  btnText: {
    fontWeight: "bold",
    color: colors.white_text,
    padding: 15
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
    marginTop: 15,
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

ChallengeScreen.navigationOptions = {
  header: null
};

export default ChallengeScreen;
