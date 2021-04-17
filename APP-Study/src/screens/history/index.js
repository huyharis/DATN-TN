import React, { useEffect, useState } from "react";
import { Text, Image, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";

import { ViewVertical } from "../../components/viewBox.component";
import Header from "../../components/header";
import Loading from '../loading';

import styles from "./styles";
import { ic_arrow_back } from "../../assets";
import webservice from "../../services";

const HistoryScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async (id) => {
    setLoading(true)
    try {
      const res = await webservice.getHistory(id);
      setData(res);
    } catch (error) {}
    setLoading(false)
  };
  useEffect(() => {
    getData(navigation.getParam("idCourse"));
  }, [navigation.getParam("idCourse")]);

  return (
    <ViewVertical style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        stylesHeader={styles.header}
        leftComponent={
          <Image source={ic_arrow_back} style={styles.backarrow} />
        }
        leftAction={() => navigation.goBack()}
      >
        <ViewVertical style={{ paddingTop: 10 }}>
          <Text style={styles.titleHeader}>まとめ知識</Text>
          <Text style={styles.textHeader}>Tổng quan kiến thức</Text>
        </ViewVertical>
      </Header>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 20,
        }}
      >
        {/* often */}
        <Text style={styles.titleItem}>間違った言葉</Text>
        <Text style={styles.subtitleItem}>Các từ sai nhiều</Text>
        {data &&
          data?.oftenWrong?.map((item, index) => (
            <ListItem
              key={index}
              title={item?.content?.mean}
              titleStyle={styles.titleStyle}
              rightTitleStyle={styles.rightTitleStyle}
              rightTitle="Thẻ ghi nhớ"
              containerStyle={styles.listItem1}
            />
        ))}

        {/* Sometime */}
        <Text style={styles.titleItem}>言葉はしばしば間違っています</Text>
        <Text style={styles.subtitleItem}>Các từ thường sai</Text>
        {data &&
          data?.sometimesWrong?.map((item, index) => (
            <ListItem
              key={index}
              title={item?.content?.mean}
              titleStyle={styles.titleStyle}
              rightTitleStyle={styles.rightTitleStyle}
              rightTitle="Thẻ ghi nhớ"
              containerStyle={styles.listItem2}
            />
          ))}

        {/* Correct */}

        <Text style={styles.titleItem}>習得した言葉</Text>
        <Text style={styles.subtitleItem}>Các từ nắm vững</Text>
        {data &&
          data?.master?.map((item, index) => (
            <ListItem
              key={index}
              title={item?.content?.mean}
              titleStyle={styles.titleStyle}
              rightTitleStyle={styles.rightTitleStyle}
              rightTitle="Thẻ ghi nhớ"
              containerStyle={styles.listItem3}
            />
          ))}
      </ScrollView>
      <Loading loading={loading}/>
    </ViewVertical>
  );
};

export default HistoryScreen;
