import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Speech from "expo-speech";

import Header from '../../components/header';
import { ViewVertical } from '../../components/viewBox.component';
import Loading from '../../components/loading'

import { ic_arrow_back } from '../../assets';
import styles from './styles';

const PronounceScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = navigation?.getParam('data');
    setData(data)
  }, [navigation?.getParam('data')])

  const openAudio = async (mean) => {
    const sound = mean.split(" ");
    await Speech.speak(sound[sound.length - 1], { language: 'ja' });
  }

  return (
    <ViewVertical style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        // mainText={'Học theo chủ đề'}
        stylesHeader={styles.header}
        leftComponent={<Image source={ic_arrow_back} style={styles.backarrow} />}
        leftAction={() => navigation.goBack()}
      >
        <ViewVertical style={{ paddingTop: 50 }}>
          <Text style={styles.titleHeader}>話し中</Text>
          <Text style={styles.textHeader}>Cách phát âm</Text>
        </ViewVertical>
      </Header>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 50
        }}
      >
        {data ? data.map((item, index) => {
          return (
            <ListItem
              key={index}
              title={item.mean}
              subtitle={item.text}
              onPress={() => { navigation.navigate('VoiceCheck') }}
              containerStyle={styles.containerStyle}
              titleStyle={styles.titleStyle}
              subtitleStyle={styles.subtitleStyle}
              // rightIcon={<Icon name='volume-down' size={25} color='#16334A'/>}
              rightIcon={{
                color: '#16334A',
                size: 30,
                name: 'volume-down',
                onPress: () => openAudio(item.mean)
              }}
            />
          )
        }) : <Loading />}

      </ScrollView>
    </ViewVertical>

  )
}

export default PronounceScreen;