import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

import { ViewVertical } from '../../components/viewBox.component';
import Header from '../../components/header';
import SildeCourese from './slideCourse';

import { ic_arrow_back } from '../../assets';
import styles from './styles'

const MemoryCardScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = navigation?.getParam('data');
    setData(data)

  }, [navigation?.getParam('data')])
  return (
    <ViewVertical style={{ flex: 1, backgroundColor: '#fff' }}>
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

      <ViewVertical>
        <Text style={styles.titleHeader}>フラッシュカード</Text>
        <Text style={styles.textHeader}>Thẻ ghi nhớ</Text>
      </ViewVertical>

      <View style={styles.containerViewSlider}>
        <ViewVertical style={styles.slider}>
          <SildeCourese data={data} />
        </ViewVertical>
        <Progress.Bar progress={0.75} width={300} style={styles.progress} color={'#2C6694'} />
      </View>


    </ViewVertical>
  )
}

export default MemoryCardScreen;