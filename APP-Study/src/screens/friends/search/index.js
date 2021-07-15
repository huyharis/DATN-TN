import React, { memo, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ListItem, Input, FlatList } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";

import WebService from "../../../services";
import Loading from "../../loading";

const SearchRoute = (props) => {
  const [text, onChangeText] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const search = (value) => {
    // if (value == "") {
    //   getList();
    //   return;
    // }
    WebService.searchFriend(value)
      .then(async (data) => {
        setFriends(data);
      })
      .catch((err) => {
        showMessage({
          message: err,
          type: "danger",
        });
      });
  };

  return (
    <View style={[styles.scene]}>
      <Input
        placeholder="Search friend by username"
        leftIconContainerStyle={{ paddingRight: 10 }}
        leftIcon={<Icon name="search" size={14} color="black" />}
        // rightIcon={
        //   <TouchableOpacity onPress={search}>
        //     <Text>Search</Text>
        //   </TouchableOpacity>
        // }
        onChangeText={search}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 15 }}
      >
        {friends &&
          friends.map((item, index) => {
            return (
              <ListItem
                key={index}
                title={item.username}
                subtitle={
                  item.isOnline ? (
                    "Online"
                  ) : (
                    <Text style={{ color: "gray" }}>Offline</Text>
                  )
                }
                leftAvatar={{
                  source: item.avatar && { uri: item.avatar },
                  // title: item.name[0],
                }}
                subtitleStyle={{ color: "green" }}
                bottomDivider
                chevron
                rightTitle={
                  item?.type == "notFriend" ? (
                    <TouchableOpacity onPress={() => addFriend(item._id, true)}>
                      <Icon name="user-plus" size={14} color="black" />
                    </TouchableOpacity>
                  ) : item?.type == "isRequest" ? (
                    <Icon name="angellist" size={14} color="black" />
                  ) : (
                    ""
                  )
                }
              />
            );
          })}
      </ScrollView>

      <Loading loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});

export default SearchRoute;
