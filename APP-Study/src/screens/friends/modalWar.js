import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Avatar } from "react-native-elements";

import { war } from "../../assets";
import ModalBox from "../../components/ModalBox";
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";
import PaperText from "../../components/PaperText";
import Button from "../../components/Button";

import styles from "./styles";
import Storage from '../../storages'
import { rejectGame } from '../../services/socketIO';

const ModalWar = ({ isVisible, onClose, receiver, roomId, time }) => {
  const [timeWait, setTimeWait] = useState(time);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    if (!timeWait) {
      rejectGame(roomId)
      setTimeWait(time);
      onClose();
      alert('Reject nhesssss')
    }
    let interval;

    if(isVisible) {
      interval = setInterval(() => {
        setTimeWait((timeWait) => timeWait - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeWait, isVisible]);

  useEffect(() => {
    const user = Storage.getUserInfo();
    setUser(user);
  }, [])

  return (
    <ModalBox isVisible={isVisible}>
      <ViewHorizontal style={styles.infoContainer}>
        <View style={styles.info}>
          <Avatar
            rounded
            source={{
              uri: user?.avatar
            }}
            size="small"
          />
        </View>

        <View style={styles.score}>
          <Image source={war} style={styles.iconWar} />
        </View>

        <View style={styles.info}>
          <Avatar
            rounded
            source={{
              uri: receiver?.avatar
            }}
            size="small"
          />
        </View>
      </ViewHorizontal>
      <ViewVertical style={styles.timeContainer}>
        <PaperText style={styles.timeText}>
          Chờ chấp nhận sau {timeWait} ...
        </PaperText>
        <Button
          title="Huỷ bỏ"
          mode="clear"
          style={styles.btnCancel}
          titleStyle={styles.btnTitleStyle}
          onPress={onClose}
        />
      </ViewVertical>
    </ModalBox>
  );
};

export default ModalWar;
