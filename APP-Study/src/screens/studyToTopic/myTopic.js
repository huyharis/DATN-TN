import React, { useEffect, useState } from "react";
import { Image, Text, Alert, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Input, ListItem, Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

import Header from "../../components/header";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";
import Loading from "../loading";

import { getErrorMessage } from "../../untils/helper";
import styles from "./styles";
import { ic_arrow_back, banner } from "../../assets";
import webservice from "../../services";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDebounce } from "../../hook/debouncedHook";

const MyTopicScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 50);

  const onSettings = (id) => {
    Alert.alert(
      "Cài đặt",
      "",
      [
        {
          text: "Sửa",
          onPress: () =>
            navigation.navigate("AddTopicScreen", { idCourse: id }),
          style: "destructive",
        },
        {
          text: "Xóa",
          onPress: () => handleDelete(id),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await webservice.deleteCourses(id);
      showMessage({
        message: "Xóa thành công",
        type: "success",
      });
      getData()
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setLoading(false);
  };



  const getData = async () => {
    setLoading(true);
    try {
      const data = await webservice.getCourses();
      setData(data);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm).then((results) => {
        setData(results);
      });
    } else {
      getData()
    }
  }, [debouncedSearchTerm])


  const handleSearch = async (value) => {
    try {
      const search = await webservice.searchTopic(value);
      return search;
    } catch (error) {
      console.log('error: ', error);
      return []
    }
  };
  return (
    <ViewVertical style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        // mainText={'Học theo chủ đề'}
        stylesHeader={styles.header}
        leftComponent={
          <Image source={ic_arrow_back} style={styles.backarrow} />
        }
        leftAction={() => navigation.goBack()}
      />
      <ViewVertical style={styles.container}>
        <ViewHorizontal style={styles.headerContainer}>
          <ViewVertical>
            <Text style={styles.titleHeader}>あなたの主題</Text>
            <Text style={styles.textHeader}>Chủ đề của bạn</Text>
          </ViewVertical>
          <Button
            onPress={() => navigation.navigate("AddTopicScreen")}
            type="clear"
            title="Tạo chủ đề"
            icon={<Icon name="playlist-add" size={20} color="#16334A" />}
            iconRight
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.buttonTitleStyle}
          />
        </ViewHorizontal>

        {!loading ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 120 }}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getData} />
            }
          >
            <Input
              placeholder="Ví dụ: Món ăn"
              rightIcon={{ type: "font-awesome", name: "search", size: 15 }}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              onChangeText={(e) => {
                setSearchTerm(e)
              }}
            // rightIconContainerStyle={styles.rightIconContainerStyle}
            />
            {data &&
              data?.courses ? (
              data?.courses?.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    containerStyle={[styles.containerStyle, { padding: 10 }]}
                    title={item.title}
                    titleStyle={styles.titleStyleItem}
                    leftElement={
                      <Image
                        source={{
                          uri: `http://192.168.1.196:3000/api/avatars/${item.avatar}`,
                        }}
                        style={styles.imageItem}
                      />
                    }
                    subtitle={
                      <ViewVertical>
                        <Text style={styles.subtitleStyle}>
                          Bao gồm: {item?.contents?.length} thuật ngữ
                        </Text>
                        <Text style={styles.subtitleStyle}>
                          Người tạo: {data?.username}
                        </Text>
                      </ViewVertical>
                    }
                    onPress={() =>
                      navigation.navigate("GetCourse", {
                        idCourese: item._id,
                        go_back_key: "MyTopicScreen",
                      })
                    }
                    rightIcon={{
                      color: "#16334A",
                      size: 30,
                      name: "settings",
                      onPress: () => onSettings(item._id),
                    }}
                  />
                );
              })
            ) : (
              data?.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    containerStyle={[styles.containerStyle, { padding: 10 }]}
                    title={item.title}
                    titleStyle={styles.titleStyleItem}
                    leftElement={
                      <Image
                        source={{
                          uri: `http://192.168.1.196:3000/api/avatars/${item.avatar}`,
                        }}
                        style={styles.imageItem}
                      />
                    }
                    subtitle={
                      <ViewVertical>
                        <Text style={styles.subtitleStyle}>
                          Bao gồm: {item?.contents?.length} thuật ngữ
                        </Text>
                        <Text style={styles.subtitleStyle}>
                          Người tạo: {data?.username}
                        </Text>
                      </ViewVertical>
                    }
                    onPress={() =>
                      navigation.navigate("GetCourse", {
                        idCourese: item._id,
                        go_back_key: "MyTopicScreen",
                      })
                    }
                    rightIcon={{
                      color: "#16334A",
                      size: 30,
                      name: "settings",
                      onPress: () => onSettings(item._id),
                    }}
                  />
                );
              })
            )
            }
          </ScrollView>
        ) : (
          <Loading />
        )}
      </ViewVertical>
    </ViewVertical>
  );
};

export default MyTopicScreen;
