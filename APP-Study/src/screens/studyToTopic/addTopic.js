import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import FilterImage from "helpers/filterImage";
import { Input, Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from "../../components/header";
import { ViewVertical } from "../../components/viewBox.component";
import ModalBox from "../../components/ModalBox";
import Loading from '../loading';

import styles from "./styles";
import { ic_arrow_back, ic_picture, ic_plus } from "../../assets";

import WebService from "../../services";
import { getErrorMessage } from "../../untils/helper";
import { ScrollView } from "react-native-gesture-handler";

const AddTopicScreen = ({ navigation }) => {
  const [localUri, setLocalUri] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("Cây tre");
  const [mean, setMean] = useState("竹");
  const [contents, setContents] = useState([]);
  const [isVisible, setIsVisiable] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);

  const chooseImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.2,
    });

    if (result.cancelled) {
      showMessage({
        message: "Bạn chưa chọn ảnh xong",
        type: "danger",
      });
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let typeFile = match ? `image/${match[1]}` : `image`;

    console.log(typeFile);

    if (!FilterImage(typeFile)) {
      showMessage({
        message: "Chỉ chọn ảnh jpg,png",
        type: "danger",
      });
      return;
    }

    setLocalUri(localUri);
    setImage({
      uri: localUri,
      name: filename,
      type: "image/jpeg",
    })
    // let data = new FormData();
    // data.append("avatar", image);
    // data.append("title", title);
    // data.append('contents', contents);
    // const res = await WebService.createCourse(data);
    // console.log(res);
  };

  const saveCourse = async () => {
    if(!title) {
      showMessage({
        message: "Title khong duoc rong",
        type: "warning",
      });
      return;
    }
    if(!image){
      showMessage({
        message: "Hay chon hinh anh",
        type: "warning",
      });
      return;
    }
    if(contents.length < 2) {đ
      showMessage({
        message: "Phải thêm ít nhất 2 thẻ ghi nhớ",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    let data = new FormData();
    data.append("avatar", image);
    data.append("title", title);
    data.append('content', JSON.stringify(contents));

    try {
      if(navigation.getParam('idCourse')) {
        await WebService.updateContentOnCourse(navigation.getParam('idCourse'),data)
        getAllCourse();
      } else {
        await WebService.createCourse(data);
        getAllCourse();
      }

      showMessage({
        message: "Lưu thành công",
        type: "success"
      });
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
      
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setLoading(false);
  }

  const getAllCourse= async ()=>{
    await WebService.getCourses()
  }

  const addContents = () => {
    if (mean === "" || name === "") {
      showMessage({
        message: "Chưa nhập đầy đủ thông tin",
        type: "warning",
      });
      return;
    }

    contents.push({ text: name, mean, _id: contents.length });
    setContents(contents);
    setName("");
    setMean("");
  };

  const updateItem = id => {
    const data = contents.filter(i => i._id === id);
    setCurrent(data[0]);
    setIsVisiable(true);
  }

  const updateContent = () => {
    const data = contents.filter(i => i._id !== current._id);
    console.log("🚀 ~ file: addTopic.js ~ line 158 ~ updateContent ~ data", data)
    data.push(current);
    setContents(data);
    // await WebService.updateContentOnCourse(data)
    setIsVisiable(false);
  }

  const getDetailCourse = async id => {
    setLoading(true);
    try {
      const res = await WebService.getDetailCourses(id);
      console.log('res', res);
      setContents(res.contents);
      setTitle(res.title);
      setLocalUri(res.avatar)
      
    } catch(error) {
      showMessage({
        message: getErrorMessage(error),
        type: 'danger'
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log(navigation.getParam('idCourse'));
    if(navigation.getParam('idCourse')) {
      getDetailCourse(navigation.getParam('idCourse'))
    }

  }, [navigation?.getParam('id')])

  return (
    <ViewVertical
      style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}
    >
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
      <ScrollView style={[styles.container, { width: "100%" }]}>
        <Text style={[styles.titleHeader, { textAlign: 'center'}]}>
          {navigation?.getParam('idCourse') ? `トピックを編集` : `その他のトピック`}
        </Text>
        <Text
          style={[styles.textHeader, { textAlign: 'center'}]}
        >
          {navigation?.getParam('idCourse') ? `Sửa chủ đề` : `Thêm chủ đề` }
        </Text>

        <Input
          label="Tên chủ đề:"
          labelStyle={styles.labelStyle}
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.inputStyle}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />

        <Text style={styles.labelStyle}>Ảnh chủ đề:</Text>
        <TouchableOpacity style={styles.selectImg} onPress={chooseImg}>
          <Image
            source={localUri ? { uri: localUri } : ic_picture}
            style={localUri ? styles.imageSelect : styles.iconSelect}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text style={styles.textCount}>
          Có tổng <Text style={styles.textCountBold}>{contents?.length}</Text>{" "}
          thẻ trong chủ đề của bạn
        </Text>

        <ViewVertical style={styles.box}>
          <Input
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputBoxContainerStyle}
            inputStyle={styles.inputStyleBox}
            onChangeText={(value) => setMean(value)}
            placeholder="Tên thẻ"
            placeholderTextColor="#C0DDF4"
            value={mean}
          />

          <Input
            labelStyle={styles.labelStyle}
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputBoxContainerStyle}
            inputStyle={styles.inputStyleBox}
            onChangeText={(value) => setName(value)}
            placeholder="Ý nghĩa của thẻ"
            placeholderTextColor="#C0DDF4"
            value={name}
          />
         
          <Button
            icon={<Icon name="plus" size={35} color="white" />}
            iconRight
            containerStyle={styles.btnContainerStyle}
            buttonStyle={styles.buttonStyle}
            iconContainerStyle={styles.iconContainerStyle}
            onPress={addContents}
            // title="Button with right icon"
          />
        </ViewVertical>
        {contents &&
          contents.map((item, index) => (
            <ListItem
              key={index}
              title={`${index + 1}. ${item.mean}`}
              subtitle={item.name}
              rightTitle={item.text}
              containerStyle={styles.containerStyleItem}
              titleStyle={styles.titleStyle}
              rightTitleStyle={styles.rightTitleStyle}
              rightIcon={{
                name: "md-arrow-dropright",
                type: "ionicon",
                color: "#2C6694",
              }}
              onPress={() => updateItem(item._id)}
            />
          ))}
      </ScrollView>
      <Button
        title="Lưu"
        containerStyle={styles.containerStyleSave}
        titleStyle={styles.titleStyleSave}
        buttonStyle={styles.buttonStyleSave}
        onPress={saveCourse}
      />
      <ModalBox
        isVisible={isVisible}
        style={styles.modal}
        onClose={() => setIsVisiable(false)}
      >
        <Input
          containerStyle={styles.containerStyleModal}
          inputContainerStyle={styles.inputModalContainerStyle}
          inputStyle={styles.inputStyle}
          onChangeText={(value) => setCurrent({ ...current, text: value })}
          placeholder="Tên thẻ"
          placeholderTextColor="#C0DDF4"
          value={current?.text}
        />
        <Input
          containerStyle={styles.containerStyleModal}
          inputContainerStyle={styles.inputModalContainerStyle}
          inputStyle={styles.inputStyle}
          onChangeText={(value) => setCurrent({ ...current, mean: value })}
          placeholder="Tên thẻ"
          placeholderTextColor="#C0DDF4"
          value={current?.mean}
        />
        <Button
          title="Lưu"
          containerStyle={styles.containerStyleUpdate}
          titleStyle={styles.titleStyleUpdate}
          buttonStyle={styles.buttonStyleUpdate}
          onPress={updateContent}
        />
      </ModalBox>
      <Loading loading={loading} />
    </ViewVertical>
  );
};

export default AddTopicScreen;
