import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { ListItem } from "react-native-elements";

import styles from "../styles";
import WebService from "../../../services";

const RequestFriend = () => {
  const [requestFriends, setRequestFriends] = useState([]);
  const [loading, setLoading] = useState(false)
  const keyExtractor = (item, index) => index.toString();

  const addFriend = (id, request) => {
    setLoading(true);
    WebService.addFriend({ friend_id: id, is_request: request })
      .then(async (data) => {
        search(text);
        showMessage({
          message: "Kết bạn thành công",
          type: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        showMessage({
          message: getErrorMessage(err),
          type: "danger",
        });
        setLoading(false);
      });
    // setLoading(false);
  };

  const renderItemRequest = ({ item }) => {
    return (
      <ListItem
        keyExtractor={keyExtractor}
        title={item.username}
        // subtitle={
        //   item.isOnline ? (
        //     "Online"
        //   ) : (
        //     <Text style={{ color: "gray" }}>Offline</Text>
        //   )
        // }
        leftAvatar={{
          source: item.avatar && { uri: item.avatar },
          // title: item.name[0],
        }}
        subtitleStyle={{ color: "green" }}
        bottomDivider
        // chevron
        rightTitle={
          <TouchableOpacity
            onPress={() => addFriend(item._id, false)}
            style={styles.btnAcceptRequest}
          >
            <Text style={styles.btnTextAccept}>Đồng ý</Text>
          </TouchableOpacity>
        }
      />
    );
  };

  const getList = async () => {
    try {
      const data = await WebService.getFriends();
      setRequestFriends(data.requestFriend);
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(requestFriends === [], requestFriends);

  return (
    <View style={[styles.scene]}>
      {requestFriends.length === 0 && (
        <Text style={{ textAlign: "center" }}>Bạn không có lời mời nào</Text>
      )}
      <FlatList
        keyExtractor={keyExtractor}
        data={requestFriends}
        renderItem={renderItemRequest}
        // refreshing={isRefreshing}
        // onRefresh={() => onRefresh()}
        // onEndReachedThreshold={0}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     marginTop: StatusBar.currentHeight,
//   },
//   scene: {
//     flex: 1,
//   },
// });

export default RequestFriend;
