import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp
// } from "react-native-responsive-screen";
import Avatar from "../../components/Avatar";
// import Paragraph from "../components/Paragraph";
import Background from "../../components/Background";
import IconComponent from "../../components/Icon";
import { crown, up_arrow } from "@assets";
import colors from "../../configs/colors";
import BackButton from "../../components/BackButton";

import { Text as TextElements } from "react-native-elements";
import styles from "./styles";
import WebService from "../../services";
import LoadingPage from '../loading';
import { showMessage } from "react-native-flash-message";

const LeaderBoardScreen = ({ navigation }) => {
  const [board, setBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBoard = async () => {
    try {
      setIsLoading(true);
      const data = await WebService.getBoard();
      const { result } = data.response;
      setBoard(result);
    } catch (error) {
      showMessage({
        message: err,
        type: "danger",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);



  return (
    <Background>
      <View style={styles.container}>
        <BackButton goBack={() => navigation.goBack()} />
        <TextElements h4 h4Style={{ textAlign: "center", fontWeight: "bold" }}>
          Bảng xếp hạng
        </TextElements>

        <View style={styles.onTop}>
          <View style={styles.user}>
            <View style={styles.level}>
              <IconComponent name="heart" size={15} color={colors.red} />
              <Text style={styles.textLevel}>2</Text>
            </View>
            <Avatar
              size={85}
              rounded
              source={board && board[1] ? board[1].avatar : null}
            />
            <Text style={styles.nameText} numberOfLines={1}>
              {board && board[1] ? board[1].username : ""}
            </Text>
            <Text style={styles.point}>
              {board && board[1] ? board[1].markHight.challenge : ""}
            </Text>
            {/* <Paragraph children="Enesto Howel" style={styles.nameText} />
            <Paragraph children="23,751" style={styles.point} /> */}
          </View>
          <View style={styles.user}>
            <Image source={crown} style={styles.image} />
            <Avatar
              size={115}
              rounded
              source={board && board[0] ? board[0].avatar : null}
            />
            <Text style={styles.nameText}>
              {board && board[0] ? board[0].username : ""}
            </Text>
            <Text style={styles.point}>
              {board && board[0] ? board[0].markHight.challenge : ""}
            </Text>
            {/* <Paragraph children="Israel Lucas" style={styles.nameText} />
            <Paragraph children="25,175" style={styles.point} /> */}
          </View>
          <View style={styles.user}>
            <View style={styles.level}>
              <IconComponent name="heart" size={15} color={colors.red} />
              <Text style={styles.textLevel}>3</Text>
            </View>
            <Avatar
              size={85}
              rounded
              source={board && board[2] ? board[2].avatar : null}
            />
            <Text style={styles.nameText}>
              {board && board[2] ? board[2].username : ""}
            </Text>
            <Text style={styles.point}>
              {" "}
              {board && board[2] ? board[2].markHight.challenge : ""}
            </Text>
            {/* <Paragraph children="Mamie Price" style={styles.nameText} />
            <Paragraph children="22,147" style={styles.point} /> */}
          </View>
        </View>

        {board.length > 3 && board.map((item, index) => {
          if (index > 2) {
            return (
              <View style={{ flexDirection: "row" }} key={index}>
                <View style={styles.level}>
                  <IconComponent name="heart" size={15} color={colors.red} />
                  <Text style={styles.textLevel}>{index + 1}</Text>
                  {/* <Paragraph children={"4"} style={styles.textLevel} /> */}
                </View>
                <View style={styles.box}>
                  <View style={styles.headerBox}>
                    <Avatar
                      size={40}
                      rounded
                      source={board && board[index] ? board[index].avatar : null}
                    />
                    <Text style={styles.textName}>{item.username}</Text>
                    {/* <Paragraph children="Enesto Howel" style={styles.textName} /> */}
                  </View>
                  <Text style={styles.pointBox}>{board[index]?.markHight?.challenge}</Text>
                  {/* <Paragraph children={"20,107"} style={styles.pointBox} /> */}
                </View>
              </View>
            )
          }
        })}



        {/* <View style={{ flexDirection: "row" }}>
          <View style={styles.level}>
            <Image source={up_arrow} style={{ width: 10, height: 10 }} />
            <Paragraph children={"5"} style={styles.textLevel} />
          </View>
          <View style={styles.box}>
            <View style={styles.headerBox}>
              <AvatarPaper size={40} />
              <Paragraph children="Enesto Howel" style={styles.textName} />
            </View>
            <Paragraph children={"19,201"} style={styles.pointBox} />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.level}>
            {/* <Image source={up_arrow} style={{width: 10, height: 10}} />
            <Paragraph children={"6"} style={styles.textLevel} />
          </View>
          <View style={styles.box}>
            <View style={{ paddingLeft: 10 }}>
              <AvatarPaper size={40} />
            </View>
            <View style={{ paddingRight: 15 }}>
              <Paragraph children={"19,100"} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.level}>
            {/* <Image source={up_arrow} style={{width: 10, height: 10}} />
            <Paragraph children={"7"} style={styles.textLevel} />
          </View>
          <View style={styles.box}>
            <View style={{ paddingLeft: 10 }}>
              <AvatarPaper size={40} />
            </View>
            <View style={{ paddingRight: 15 }}>
              <Paragraph children={"17,112"} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.level}>
            {/* <Image source={up_arrow} style={{width: 10, height: 10}} /> 
            <Paragraph children={"8"} style={styles.textLevel} />
          </View>
          <View style={styles.box}>
            <View style={{ paddingLeft: 10 }}>
              <AvatarPaper size={40} />
            </View>
            <View style={{ paddingRight: 15 }}>
              <Paragraph children={"16,000"} />
            </View>
          </View>
        </View> */}
      </View>

      <LoadingPage loading={isLoading} />
    </Background>
  );
};

LeaderBoardScreen.navigationOptions = {
  header: null,
};

export default LeaderBoardScreen;
