import React, { useEffect, useState } from "react";
import { Image, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Input, ListItem, Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

import Header from "../../components/header";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";

import styles from "./styles";
import { ic_arrow_back, banner } from "../../assets";

import webservice from "../../services";
import { change_alias } from "../../untils/helper";

const StudyTopicScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  const handleSearch = async (value) => {
    // const search = await data.filter(
    //   (item) => change_alias(item.title).toLowerCase().indexOf(value) >= 0
    // );
    try {
      const search = await webservice.searchTopic(value);
      setData(search);
    } catch(error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }   
  };

  const getData = async () => {
    try {
      const data = await webservice.getPublicCourse();
      setData(data.result);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const { state, navigate } = navigation;    

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
        leftAction={() => navigation.navigate("DashBoard")}
      />
      <ViewVertical style={styles.container}>
        <ViewHorizontal style={styles.headerContainer}>
          <ViewVertical>
            <Text style={styles.titleHeader}>トピックス一覧</Text>
            <Text style={styles.textHeader}>Danh sách chủ đề</Text>
          </ViewVertical>

          <Button
            onPress={() => navigation.navigate("MyTopicScreen")}
            type="clear"
            title="Chủ đề của bạn"
            // icon={<Icon name="playlist-add" size={15} color="#16334A" />}
            iconRight
            buttonStyle={styles.btnStyle}
            titleStyle={styles.buttonTitleStyle}
          />
        </ViewHorizontal>
      </ViewVertical>
      <ScrollView style={styles.container}>
        <Input
          placeholder="Ví dụ: Món ăn"
          rightIcon={{ type: "font-awesome", name: "search", size: 15 }}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          onChangeText={handleSearch}
          // rightIconContainerStyle={styles.rightIconContainerStyle}
        />
        {data &&
          data.map((item, index) => {
            return (
              <ListItem
                key={index}
                containerStyle={[styles.containerStyle, { padding: 10 }]}
                title={item.title}
                titleStyle={styles.titleStyleItem}
                leftElement={
                  <Image
                    source={{ uri: item.avatar }}
                    style={styles.imageItem}
                  />
                }
                subtitle={
                  <ViewVertical>
                    <Text
                      style={styles.subtitleStyle}
                    >{`Bao gồm: ${item?.contents?.length} thuật ngữ`}</Text>
                    <Text
                      style={styles.subtitleStyle}
                    >{`Người tạo: Admin`}</Text>
                  </ViewVertical>
                }
                onPress={() =>
                  navigation.navigate("GetCourse", { idCourese: item._id, go_back_key: 'ListTopic' })
                }
              />
            );
          })}
      </ScrollView>
    </ViewVertical>
  );
};

export default StudyTopicScreen;
