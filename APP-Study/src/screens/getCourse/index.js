import React, { Component } from 'react';
import { View, Text, RefreshControl, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, ListItem } from 'react-native-elements';
import { showMessage, hideMessage } from 'react-native-flash-message';
import * as Progress from 'react-native-progress';

import Loading from '@components/loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Api from '@services';
import { CoursesACtion } from '@actions/CoursesAction';
import SildeCourese from './slideCourse';
import SoundCourse from './soundCourse';
import PropTypes from 'prop-types';
import Service from '../../services';
import Styles from './styles';
import Header from '../../components/header';
import { ViewVertical } from '../../components/viewBox.component';
import Storage from '../../storages';
import ModalBox from '../../components/ModalBox';
import { getErrorMessage } from '../../untils/helper';

import {
  ic_arrow_back,
  ic_share,
  ic_offline_pin,
  ic_view_carousel,
  ic_spellcheck,
  ic_assignment,
  ic_record_voice_over,
  background,
  CLOSE
} from '../../assets';

export default class GetCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      friends: [],
      loading: false,
      user: {},
      isVisible: false,
    };
  }

  getData(id) {
    this.setState({ loading: true });
    Service.getDetailCourses(id)
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('idCourese');
    const user = Storage.getUserInfo();
    this.setState({ user });
    this.getData(id);
  }
  _handleToMemmory = () => {
    const { data } = this.state;
    this.props.navigation.navigate('MemmoryCard', { data: data });
  };
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  UNSAFE_componentWillReceiveProps(nextProps) {
    const idNext = nextProps.navigation.getParam('idCourese');
    const id = this.props.navigation.getParam('idCourese');

    if (idNext !== id) {
      this.getData(idNext);
    }
  }

  onShare = async () => {
    try {
      const data = await Service.getFriends();
      this.setState({ friends: data.friends, isVisible: true });
    } catch (error) {
      showMessage({
        type: 'danger',
        message: getErrorMessage(error)
      })
    }
  };

  shareToFriends = async friend_id => {
    try {
      const course_id = this.props.navigation.getParam('idCourese');

      const data = await Service.shareCourse({ friend_id, course_id })
      showMessage({
        type: 'success',
        message: 'Chia sẻ thành công'
      })
    } catch (error) {
      showMessage({
        type: 'danger',
        message: getErrorMessage(error)
      })
    }
  }

  render() {
    const { data, loading, user, friends, isVisible } = this.state;

    const { navigation } = this.props;
    const { state, navigate, goBack } = navigation;
    const params = state.params || {};
    const id = this.props.navigation.getParam('idCourese');

    const CardList = [
      {
        icon: ic_view_carousel,
        title: 'フラッシュカード',
        rightTitle: 'Thẻ ghi nhớ',
        onPress: () =>
          navigation.navigate('MemoryCardScreen', { data: data?.contents }),
      },
      {
        icon: ic_spellcheck,
        title: '筆記試験',
        rightTitle: 'Kiểm tra viết',
        onPress: () =>
          navigation.navigate('WritingTestScreen', { idCourse: id }),
      },
      {
        icon: ic_offline_pin,
        title: '語彙テスト',
        rightTitle: 'Kiểm tra trắc nghiệm',
        onPress: () =>
          navigation.navigate('ChoiceTestScreen', { idCourse: id }),
      },
      {
        icon: ic_assignment,
        title: 'まとめ知識',
        rightTitle: 'Tổng quan kiến thức',
        onPress: () => navigation.navigate('HistoryScreen', { idCourse: id }),
      },
      {
        icon: ic_record_voice_over,
        title: '話し中',
        rightTitle: 'Cách phát âm',
        onPress: () =>
          navigation.navigate('PronounceScreen', { data: data?.contents }),
      },
    ];

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
          stylesHeader={Styles.header}
          leftComponent={
            <Image source={ic_arrow_back} style={Styles.backarrow} />
          }
          leftAction={() => navigate(params.go_back_key)}
          actionRight={[
            // {
            //   // component: <BadgedIcon type="ionicon" name="md-notifications" color={"#fff"} style={styles.icon}/>,
            //   component: (
            //     <Image source={ic_notifications} style={styles.icon} />
            //   ),
            //   action: () => navigation.navigate("Notifications"),
            //   styleTouchable: {
            //     top: 9,
            //   },
            // },
            // {
            //   component: (
            //     <Avatar rounded source={{ uri: user?.avatar }} size="small" />
            //   ),
            //   action: () => navigation.navigate("Profile"),
            //   styleTouchable: {
            //     top: 9,
            //   },
            // },
            data?.type === 'private' && {
              // component: <BadgedIcon type="ionicon" name="md-notifications" color={"#fff"} style={styles.icon}/>,
              component: <Image source={ic_share} style={Styles.icon} />,
              action: () => this.onShare(),
              styleTouchable: {
                top: 9,
              },
            },
          ]}
        />

        {!loading ? (
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingLeft: 20,
              paddingRight: 20,
            }}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => this.getData(params.idCourese)}
              />
            }
          >
            {/* slide */}
            <Text style={Styles.titleHeader}>トピックで学ぶ</Text>
            <Text style={Styles.textHeader}>Học theo chủ đề</Text>
            {/* <View style={Styles.containerSlider}> */}
            <View style={Styles.headerContainer}>
              {/* <SildeCourese data={data} /> */}
              <Image
                source={data?.avatar ? { uri: data.avatar } : background}
                resizeMode="cover"
                style={{ height: '70%', width: '100%' }}
              />
              <ViewVertical style={Styles.headerTextContainer}>
                <Text style={Styles.headerText}>{data?.title}</Text>
              </ViewVertical>
            </View>
            {/* </View> */}
            {/* endslide */}

            <ViewVertical style={Styles.progressContainer}>
              <Text style={Styles.progressText}>
                Tiến độ hoàn thành của chủ đề: {data?.complete?.toFixed(2)}%
              </Text>
              <Progress.Bar
                progress={data?.complete / 100 || 0}
                width={300}
                color={'#2C6694'}
                style={Styles.progress}
              />
            </ViewVertical>

            <ViewVertical style={Styles.eventContainer}>
              <Text style={Styles.eventText}>
                Chủ đề bao gồm: {data?.contents?.length} thẻ ghi nhớ
              </Text>

              {CardList
                ? CardList.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      leftElement={
                        <Image
                          source={item.icon}
                          style={{ width: 20, height: 20 }}
                          resizeMode="contain"
                        />
                      }
                      title={item.title}
                      rightTitle={item.rightTitle}
                      titleStyle={Styles.titleStyle}
                      rightTitleStyle={Styles.titleStyle}
                      containerStyle={Styles.containerStyleItem}
                      rightContentContainerStyle={
                        Styles.rightContentContainerStyle
                      }
                      onPress={item.onPress}
                    />
                  );
                })
                : null}
            </ViewVertical>
          </ScrollView>
        ) : (
          <Loading />
        )}
        <ModalBox style={Styles.modalbox} isVisible={isVisible}>
          <TouchableOpacity
            style={Styles.icContainer}
            onPress={() => this.setState({ isVisible: false })}
          >
            <Image source={CLOSE} style={Styles.icClose} />
          </TouchableOpacity>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingLeft: 20,
              paddingRight: 20,
              width: '100%',
            }}
          >
            {friends &&
              friends.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    leftElement={
                      <Avatar rounded source={{ uri: item.avatar }} size="small" />
                    }
                    title={item.username}
                    // rightTitle={item.rightTitle}
                    titleStyle={Styles.titleStyle}
                    rightTitleStyle={Styles.titleStyle}
                    containerStyle={Styles.containerStyleModal}
                    rightContentContainerStyle={
                      Styles.rightContentContainerStyle
                    }
                    // onPress={item.onPress}
                    rightIcon={{
                      color: "#16334A",
                      size: 30,
                      name: "share",
                      onPress: () => this.shareToFriends(item._id),
                    }}
                  />
                );
              })}
          </ScrollView>
        </ModalBox>
      </ViewVertical>
    );
  }
}
