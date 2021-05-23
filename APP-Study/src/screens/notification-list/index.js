import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

import Text from "../../components/text.component";
// import Header from 'components/header/header.component';
import {
  ViewVertical,
  ViewHorizontal,
} from "../../components/viewBox.component";
import Header from "../../components/header";

import styles from "./styles";
import WebService from "../../services";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";

import { ic_arrow_back } from "../../assets";

// import colors from 'constants/colors';
// import { fontSizes, fontFamilies } from 'constants/fonts';
// import { BACK_ARROW } from 'assets';
// import NavigationActionsService from '@utils/navigation';
// import { NOTIFICATION_DETAIL } from 'constants/';
// import { RootState } from 'reducers/';
// import { getListNotifications } from 'actions/notification.action';
// import { strings } from 'utils/i18n';

import Navigator from "../../navigator/Navigator";
import LoadingPage from "../loading";
import { getErrorMessage } from "../../untils/helper";
import { UserACtion } from "../../actions/userAction";
import { pushNotification } from "../../services/socketIO";

const NotificationList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [isRefresh, setIsRefresh] = useState(false);

  const notiRedux = useSelector((state) => state.UserReducer.noti);

  console.log("notiRedux", notiRedux);

  useEffect(() => {
    if (notiRedux?.length === 0 || notiRedux === undefined) {
      getList();
    }
  }, []);

  const getNotificationSocket = (data) => {
    console.log(data);

    if (data) {
      dispatch(UserACtion.addNoti(data));
    }
  };

  useEffect(() => {
    pushNotification(getNotificationSocket);
  });

  const getList = async () => {
    setIsLoading(true);
    try {
      const data = await WebService.getListNoti();
      await WebService.seenNotify();

      dispatch(UserACtion.getNoti(data.result));
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setIsLoading(false);
  };

  const _onHandleAccept = async (item) => {
    const { contentMess, sentUser, _id } = item;
    setIsLoading(true);

    try {
      await WebService.deleteNotify(_id);

      if (contentMess.type === "INVITE_GAME") {
        await WebService.acceptGame({
          friend_id: sentUser._id,
          content: contentMess.content,
          accept: true,
        });
      } else {
        if (contentMess.type === "SHARE_COURSE") {
          await WebService.acceptCourse({
            course_id: contentMess.content,
          });
        } else {
          await WebService.addFriend({ friend_id: sentUser._id });
        }
      }
      showMessage({
        message: "Success",
        type: "success",
      });
      Navigator.navigate("DashBoard");
    } catch (error) {
      showMessage({
        message: getErrorMessage(error),
        type: "danger",
      });
    }
    setIsLoading(false);
  };

  const _onHandleCancel = (value) => {
    console.log("value", value);
    showMessage({
      message: "Success",
      type: "success",
    });
  };

  return (
    <ViewVertical style={{ backgroundColor: "#fff" }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: "#000",
          fontSize: 15,
          fontWeight: "bold",
        }}
        mainText={"Thông báo"}
        stylesHeader={styles.header}
        leftComponent={
          <Image source={ic_arrow_back} style={styles.backarrow} />
        }
        leftAction={() => navigation.goBack()}
      />

      <ViewVertical style={styles.container}>
        {notiRedux && notiRedux.length > 0 ? (
          <FlatList
            data={notiRedux}
            keyExtractor={(item) => {
              return item._id;
            }}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={getList} />
            }
            style={styles.flatContainer}
            renderItem={({ item }) => {
              return (
                <ViewVertical
                  key={item._id}
                  style={[
                    styles.boxItem,
                    item.read_by ? "" : { backgroundColor: "#EEBEBF" },
                  ]}
                >
                  <TouchableOpacity>
                    <ViewHorizontal style={styles.boxHeader}>
                      <Avatar
                        size={40}
                        source={item.sentUser.avatar}
                        style={{}}
                      />
                      <ViewVertical style={styles.boxContent}>
                        <Text style={styles.itemName}>
                          {item.sentUser.username}
                          <Text style={styles.itemDescription}>
                            {item.contentMess.type === "ADD_FRIEND" &&
                              " đã gửi cho bạn lời mời kết bạn."}
                            {item.contentMess.type === "SHARE_COURSE" &&
                              " chia sẽ khóa học với bạn"}
                            {item.contentMess.type === "INVITE_GAME" &&
                              " gửi lời mời tham gia thử thách"}
                          </Text>
                        </Text>
                        <ViewHorizontal style={styles.boxFooter}>
                          <TouchableOpacity
                            onPress={() => _onHandleAccept(item)}
                            style={styles.btnAccept}
                          >
                            <Text style={styles.btnText}>Đồng ý</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => _onHandleCancel(item._id)}
                            style={styles.btnCancel}
                          >
                            <Text style={styles.btnText}>Xóa</Text>
                          </TouchableOpacity>
                        </ViewHorizontal>
                      </ViewVertical>
                    </ViewHorizontal>
                  </TouchableOpacity>
                </ViewVertical>
              );
            }}
          />
        ) : (
          <ViewVertical
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text>No notification</Text>
          </ViewVertical>
        )}
      </ViewVertical>

      <LoadingPage loading={isLoading} />
    </ViewVertical>
  );
};

NotificationList.navigationOptions = {
  title: "Notification",
};

export default NotificationList;
