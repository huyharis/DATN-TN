import React, { useEffect, useState } from "react";
import {
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  withBadge,
  Avatar,
  Button,
  ListItem,
  message,
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as Progress from "react-native-progress";
import { showMessage } from "react-native-flash-message";

import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";
import Header from "../../components/header";
import ButtonPaper from "../../components/ButtonPaper";
import { getErrorMessage } from "../../untils/helper";
import LoadingPage from "../loading";

import {
  banner,
  ic_menu,
  ic_notifications_none,
  ic_notifications,
  bg_background_topic_1,
  background,
  bg_background_topic_2,
  ic_arrow_right,
  bg_background_topic_3,
  ig_challenge,
} from "../../assets";

import { handleError } from "../../services/socketIO";
import colors from "../../configs/colors";
import Storage from "../../storages";
import webservice from "../../services";
import styles from "./styles";

const DashBoardScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectItem = id => {
    console.log(id);

    navigation.navigate("GetCourse", {
      idCourese: id,
      go_back_key: "DashBoard",
    });
  };

  /**  const FlatItem = ({ item, onSelect }) => {
    const { id } = item;
    return (
      <ViewVertical style={id === "1" ? styles.boxFirst : styles.boxItem}>
        <ImageBackground
          source={item.background}
          resizeMode="cover"
          style={styles.backgroundItem}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity onPress={onSelect} style={styles.boxStyle}>
            <Text style={styles.textName}>{item.nameJP}</Text>
            <Text style={styles.textItem}>{item.spell}</Text>
            <Text style={styles.textItem}>{item.nameVI}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ViewVertical>
    );
  };*/

  const FlatItem = ({ item, onSelect, index }) => {
    console.log("index", index);
    console.log("item", item);

    const { id } = item;
    return (
      <ViewVertical
        style={index === 0 ? styles.boxFirst : styles.boxItem}
        key={item._id}
      >
        <ImageBackground
          source={index === 0 ? bg_background_topic_2 : bg_background_topic_3}
          resizeMode="cover"
          style={styles.backgroundItem}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity onPress={onSelect} style={styles.boxStyle}>
            {/* <Progress.Circle progress={0.75} width={300} color={'#2C6694'} style={styles.progress}/> */}
            <Progress.Circle
              size={65}
              showsText={true}
              progress={item.complete / 100}
              color={"#2C6694"}
              indeterminate={false}
              style={styles.progress}
              formatText={() => `${item.complete.toFixed(2)}%` }
              textStyle={styles.textStyle}
            />
            {/* <Text style={styles.textName}>{item.title}</Text>
            <Text style={styles.textItem}>{item.spell}</Text> */}
            <Text style={styles.textItem}>{item?.topic?.title}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ViewVertical>
    );
  };

  // const BadgedIcon = withBadge(1)(<Image source={ic_notifications}/>);

  const GAME = [
    {
      id: "1",
      icon: background,
      name: "Bài cào",
      navigate: "AlphabetScreen",
    },
  ];

  const getPublicCourse = async () => {
    setLoading(true);
    try {
      const res = await webservice.getListCurrentPublic();
      setCourses(res);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    handleError(alert);
  }, []);

  useEffect(() => {
    const user = Storage.getUserInfo();
    setUser(user);
    getPublicCourse();
  }, []);

  console.log('courses', courses);
  

  return (
    <ViewVertical style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "red",
          fontSize: 15,
          fontWeight: "bold",
        }}
        // mainText={'Home'}
        stylesHeader={styles.header}
        leftComponent={<Image source={ic_menu} style={styles.icon} />}
        leftAction={() => navigation.openDrawer()}
        actionRight={[
          {
            // component: <BadgedIcon type="ionicon" name="md-notifications" color={"#fff"} style={styles.icon}/>,
            component: <Image source={ic_notifications} style={styles.icon} />,
            action: () => navigation.navigate("Notifications"),
            styleTouchable: {
              top: 9,
            },
          },
          {
            component: (
              <Avatar rounded source={{ uri: user?.avatar }} size="small" />
            ),
            action: () => navigation.navigate("Profile"),
            styleTouchable: {
              top: 9,
            },
          },
        ]}
      />

      <ScrollView
        style={styles.viewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPublicCourse} />
        }
      >
        <Text style={styles.topicTitle}>トピックで学ぶ</Text>
        <Text style={styles.topicText}>Học theo chủ đề</Text>

        <ViewVertical style={styles.topicContainer}>
          <FlatList
            horizontal
            data={courses}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            // style={styles.topicContainer}
            renderItem={({ item, index }) => (
              <FlatItem
                item={item}
                onSelect={() => onSelectItem(item?.topic?._id)}
                index={index}
              />
            )}
          />
        </ViewVertical>

        <ViewHorizontal style={styles.challengeContainer}>
          <ViewVertical style={styles.challengeLeft}>
            <Text style={styles.challengeTitle}>チャレンジラン</Text>
            <Text style={styles.challengeText}>Đường đua tranh tài</Text>

            <Button
              title="開始"
              type="clear"
              buttonStyle={styles.btnChallenge}
              titleStyle={styles.btnTitleStyle}
              onPress={() => navigation.navigate("Challenge")}
              iconRight
              icon={<Icon name="running" size={15} color={colors.title} />}
            />
          </ViewVertical>
          <ViewVertical style={styles.challengeRight}>
            <TouchableOpacity onPress={() => navigation.navigate("Alphabet")}>
              <Text style={styles.challengeTitle}>アルファベット</Text>
              <Text style={styles.challengeText}>Bảng chữ cái</Text>
            </TouchableOpacity>
            {/* <Image source={ig_challenge}/> */}
          </ViewVertical>
        </ViewHorizontal>

        <ViewVertical style={styles.gameContainer}>
          <Text style={styles.topicTitle}>知的ゲーム</Text>
          <Text style={styles.gameText}>Trò chơi trí tuệ</Text>

          <ListItem
            containerStyle={styles.containerStyleBox}
            leftAvatar={{ source: background }}
            title={"チャレンジラン"}
            subtitle={"Học và kiểm tra"}
            rightElement={<Image source={ic_arrow_right} />}
            onPress={() => navigation.navigate("Lesson")}
          />

          {/* <ListItem
            containerStyle={styles.containerStyleBox}
            leftAvatar={{ source: background }}
            title={"チャレンジラン"}
            subtitle={"Đường đua tranh tài"}
            onPress={()=>navigation.navigate("GetChallenge")}
            rightElement={<Image source={ic_arrow_right} />}
            rightContentContainerStyle={{ backgroundColor: "transparent" }}
          /> */}

          {/* {GAME.map((item, index) => {
            return (

            )
          })} */}
        </ViewVertical>
      </ScrollView>

      <LoadingPage loading={loading} />
    </ViewVertical>
  );
};

DashBoardScreen.navigationOptions = {
  header: null,
};

export default DashBoardScreen;
