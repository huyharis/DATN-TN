import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { ViewVertical } from "../../components/viewBox.component";
import Header from "../../components/header";
import { ic_arrow_back } from "../../assets";
import colors from "../../configs/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const FinishTestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Header
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
        leftAction={() => navigation.navigate("GetCourse")}
      /> */}
      <ViewVertical style={styles.box}>
        <Text style={styles.title}>完了したテスト</Text>
        <Text style={styles.text}>Kiểm tra hoàn thành</Text>
        <Text style={styles.text}>
          Bạn làm đúng {navigation.getParam("score")} / {navigation.getParam("count")}
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("GetCourse", {
              id: navigation.getParam("idCourse"),
            })
          }
        >
          <Text style={styles.btnText}>Quay lại</Text>
        </TouchableOpacity>
      </ViewVertical>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  backarrow: {
    top: 7,
    width: 25,
    height: 25,
  },
  header: {
    backgroundColor: colors.white,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "100%",
    height: 200,
    backgroundColor: "#C0DDF4",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "#2C6694",
    textAlign: "center",
    lineHeight: 37,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#2C6694",
    textAlign: "center",
  },
  btn: {
    marginTop: 15,
    backgroundColor: "#16334A",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#fff",
  },
  btnText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
});

export default FinishTestScreen;
