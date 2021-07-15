import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import * as Speech from "expo-speech";

import { ViewVertical } from "../../components/viewBox.component";
import Text from "../../components/text.component";
import ModalBox from "../../components/ModalBox";
import Header from '../../components/header';

import WebService from "../../services";

import styles from "./styles";
import LoadingPage from "../loading";
import { getErrorMessage } from "../../untils/helper";
import { CLOSE, SPEAKER, ic_arrow_back } from '../../assets';

const AlphabetScreen = ({ navigation }) => {
  const [isSelect, setIsSelect] = useState(false);
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(null);
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const onChangeAlphabet = async (type = "hiragana", isSelect, limit = 28) => {
    setIsLoading(true);
    setPage(1)
    try {
      setIsSelect(isSelect);
      const response = await WebService.getAlphabet(type, limit);

      setData(response.result);
    } catch (error) {
      showMessage({
        type: "warning",
        message: getErrorMessage(error),
      });
    }
    setIsLoading(false);
  };

  const goDetail = (item) => {
    setCurrent(item);
    setIsVisible(true);
  };

  const handleSound = async () => {
    try {
      let thingToSay = current?.alt;
      await Speech.speak(thingToSay, { language: 'ja' });
    } catch (error) {
      alert("Lỗi khi phát audio");
    }
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  const loadMoreData = async () => {
    if (loadMore) {
      return
    }
    setLoadMore(true);
    try {
      const response = await WebService.getAlphabet(isSelect ? 'katakana' : 'hiragana', 28, page + 1);
      if (!response.result) return;
      setData([...data, ...response.result]);
      setPage(page + 1);
    } catch (error) {
      showMessage({
        type: "warning",
        message: getErrorMessage(error),
      });
    }
    setLoadMore(false)
  }

  useEffect(() => {
    onChangeAlphabet();
  }, []);

  return (
    <ViewVertical style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        mainText={'Bảng chữ cái'}
        stylesHeader={styles.header}
        leftComponent={<Image source={ic_arrow_back} style={styles.backarrow} />}
        leftAction={() => navigation.goBack()}
      />

      <View style={styles.headerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Hiragana"
            buttonStyle={[
              styles.buttonStyle,
              !isSelect && styles.buttonSelected,
            ]}
            titleStyle={[styles.titleStyle, !isSelect && styles.titleSelected]}
            onPress={() => onChangeAlphabet("hiragana", false)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Katakana"
            buttonStyle={[
              styles.buttonStyle,
              isSelect && styles.buttonSelected,
            ]}
            titleStyle={[styles.titleStyle, isSelect && styles.titleSelected]}
            onPress={() => onChangeAlphabet("katakana", true)}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            listener: event => {
              if (isCloseToBottom(event.nativeEvent)) {
                loadMoreData()
              }
            }
          }
        )}
      >
        <View style={styles.alphabetContainer}>
          {data &&
            data.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => goDetail(item)} key={index}>
                  <View style={styles.alphabetItem}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ width: 65, height: 65 }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <ModalBox
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        style={styles.modalbox}
      >
        <TouchableOpacity style={styles.icContainer} onPress={() => setIsVisible(false)}>
          <Image source={CLOSE} style={styles.icClose} />
        </TouchableOpacity>

        <Image
          source={{ uri: current?.detail }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />

        <TouchableOpacity style={styles.icSoundContainer} onPress={handleSound}>
          <Image source={SPEAKER} style={styles.icSound} />
        </TouchableOpacity>
      </ModalBox>

      <LoadingPage loading={isLoading} />
    </ViewVertical>
  );
};

export default AlphabetScreen;
