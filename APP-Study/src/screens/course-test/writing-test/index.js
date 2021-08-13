import React, { useState, useEffect } from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Avatar, Input } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import { showMessage } from "react-native-flash-message";

import { ViewVertical } from '../../../components/viewBox.component';
import Header from '../../../components/header'
import styles from './styles';
import { ic_arrow_back, ic_notifications } from '../../../assets';
import webservice from '../../../services';
import { change_alias, getErrorMessage } from "../../../untils/helper";

const WritingTestScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState(null);
  const [dataSubmit, setDataSubmit] = useState([]);

  const onNext = () => {
    dataSubmit.push({ content: current.course._id, rightAnwser: 0 });
    finishTest(dataSubmit)
  };

  const finishTest = async value => {
    const score = dataSubmit?.filter((item) => item.rightAnwser === 1).length;

    if (current.index === data.length - 1) {
      const body = {
        topic: navigation.getParam('idCourse'),
        contents: value
      }

      try {
        const res = await webservice.setHistory(body);
        navigation.navigate('FinishTestScreen', {
          idCourse: navigation.getParam('idCourse'),
          score,
          count: data.length
        });

      } catch (error) {
        showMessage({
          message: getErrorMessage(error),
          type: "danger",
        });
      }

      return;
      // Call api
    }
    setCurrent({ course: data[current.index + 1], index: current.index + 1 })
  }

  const onSubmit = () => {
    // const textSubmit = change_alias(text).toLowerCase();
    // const textCorrect = change_alias(current?.course?.text).toLowerCase() || undefined;

    const textSubmit = text;
    const correct = current?.course?.mean?.split(" ");

    const textCorrect = correct[correct.length - 1] || undefined;

    if (textSubmit === textCorrect) {
      dataSubmit.push({ content: current.course._id, rightAnwser: 1 })
    }
    else {
      dataSubmit.push({ content: current.course._id, rightAnwser: 0 })
    };

    setDataSubmit(dataSubmit);
    setText('')
    finishTest(dataSubmit)
  }

  const getData = async (id) => {
    try {
      const response = await webservice.getDetailCourses(id);
      setData(response.contents);
      setCurrent({ course: response?.contents[0], index: 0 })
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
  }

  useEffect(() => {
    getData(navigation.getParam('idCourse'));
  }, [navigation.getParam('idCourse')])

  return (
    <ViewVertical style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: '#000',
          fontSize: 15,
          fontWeight: 'bold',
        }}
        // mainText={'Học theo chủ đề'}
        stylesHeader={styles.header}
        leftComponent={
          <Image source={ic_arrow_back} style={styles.backarrow} />
        }
        leftAction={() => navigation.navigate('GetCourse')}
      />

      <ViewVertical style={styles.container}>
        <ViewVertical style={styles.headerContainer}>
          <Text style={styles.headerTitle}>語彙テスト</Text>
          <Text style={styles.headerText}>Kiểm tra từ vựng</Text>
        </ViewVertical>

        <ViewVertical style={styles.bodyContainer}>
          <ViewVertical style={styles.boxContainer}>
            <Text style={styles.boxText}>{current?.course?.text}</Text>
            <Progress.Bar progress={(current?.index / data?.length) || 0} width={300} style={styles.progress} color={'#2C6694'} />
          </ViewVertical>
          <Input
            placeholder='Từ này nghĩa là'
            inputContainerStyle={styles.inputText}
            value={text}
            onChangeText={value => setText(value)}
            inputStyle={styles.inputStyle}
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity onPress={onNext}>
            <Text style={styles.cancelText}>Tôi không biết câu trả lời</Text>
          </TouchableOpacity>
        </ViewVertical>

      </ViewVertical>

    </ViewVertical>
  )
};

export default WritingTestScreen