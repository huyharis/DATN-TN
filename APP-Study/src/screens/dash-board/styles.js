import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from '../../configs/colors'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 30,
    // paddingRight: 30,
    // marginTop: 20,
    backgroundColor: '#fff'
  },
  topicContainer: {
    alignItems: 'flex-end'
    // justifyContent: 'flex-end'
  },
  topicTitle: {
    color: colors.title,
    fontSize: 22,
    fontWeight: 'bold'
  },
  progress: {
    paddingBottom: 20
  },
  textStyle: {
    color: '#234958',
    fontSize: 13
  },  
  topicText: {
    color: colors.title,
    paddingBottom: 15,
    fontSize: 15,
    paddingLeft: 5,
    fontWeight: 'normal'
  },
  boxFirst: {
    width: wp('42%'),
    height: hp('32%'),
    borderRadius: 10,
    marginRight: wp('5%'),
  },
  boxItem: {
    width: wp('35%'),
    height: hp('25%'),
    borderRadius: 10,
    marginRight: wp('5%'),
  },
  backgroundItem: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boxStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  imageStyle: {
    borderRadius: 10
  },
  
  viewContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    // marginTop: 5,
    // alignItems: 'center',
  },
  challengeContainer: {
    // flex: 1,
    backgroundColor: colors.pink,
    borderRadius: 15,
    // paddingTop: hp('3%'),
    // paddingBottom: hp('3%'),
    paddingLeft: wp('2%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  challengeLeft: {
    width: '60%',
    alignItems: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
  },  
  challengeRight: {
    width: '40%',
    // alignItems: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('3%'),
    backgroundColor: '#BBDDEA',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnChallenge: {
    backgroundColor: colors.white_color,
    width: wp('33%'),
    borderRadius: 5
  },
  challengeTitle: {
    color: colors.title,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  challengeText: {
    color: colors.title,
    paddingBottom: 15,
    fontSize: 13,
    paddingLeft: 5,
    fontWeight: 'normal',
    textAlign: 'center'
  },
  btnTitleStyle: {
    color: colors.title,
    fontSize: 12,
    paddingRight: 10
  },
  header: {
    marginTop: 10
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 1,
  },
  icon: {
    // elevation: 5,
  },
  itemContainer: {
    paddingRight: 15
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 45
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.title
  },
  textItem: {
    color: '#333',
    fontWeight: 'normal',
    fontSize: 13,
    color: colors.title,
    textAlign: 'center'
  },
  gameContainer: {

  },
  gameText: {
    color: colors.title,
    paddingBottom: 5,
    fontSize: 15,
    // paddingLeft: 5,
    fontWeight: 'normal'
  },
  containerStyleBox: {
    backgroundColor: '#BBDDEA',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10
  }
})