import { StyleSheet } from 'react-native';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
// import { fontSizes, fontFamilies } from '@constants/fonts';
const backgroundMainTheme = ['#f2fcfe', '#C4E0E5', '#C4E0E5', '#C4E0E5'];
const backgroundPublicTheme = ['#CF0A2C', '#680516'];
const redBold = '#8B1D1F';
const grayLight = 'rgba(0,0,0,0.1)';
const gray = 'rgba(0,0,0,0.3)';
const darkBlue = '#487996';
const white = '#FFFFFF';
const black = '#000';
const cancel = 'red';
const done = 'blue';
const mainColor = '#CF0A2C';
const background = '#FFFFFF';
const whiteSmoke = '#F2F2F2';
const active = '#8CC540';
const inactive = '#BEBEBE';
const btnBrColor = '#CF0A2C';
const buttonColor = '#F2FEFE';
const placeholderTextColor = '#BEBEBE';
const labelColor = '#06313E';
const lightRed = '#EEBEBF';

const colors = {
  mainColor,
  background,
  white,
  black,
  cancel,
  done,
  backgroundMainTheme,
  backgroundPublicTheme,
  buttonColor,
  grayLight,
  gray,
  darkBlue,
  whiteSmoke,
  active,
  inactive,
  btnBrColor,
  labelColor,
  redBold,
  placeholderTextColor,
  lightRed
};

const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
// const fontFamilies = {
//   thin: {
//     fontFamily: 'Roboto-Thin'
//     // fontWeight: '200',
//   },
//   bold: {
//     fontFamily: 'Roboto-Bold'
//     // fontWeight: '800'
//   },
//   light: {
//     fontFamily: 'Roboto-Light'
//   },
//   medium: {
//     fontFamily: 'Roboto-Medium'
//     // fontWeight: '700',
//   },
//   regular: {
//     fontFamily: 'Roboto-Regular'
//     // fontWeight: '300',
//   }
// };

const fontSizes = {
  smallest: normalize(12),
  smaller: normalize(14),
  small: normalize(17),
  title: normalize(25),
  medimum: normalize(40),
  large: normalize(50),
  hero: normalize(60),
  superHero: normalize(112)
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  // header style
  backarrow: {
    top: 7,
    width: 25,
    height: 25
  },
  header: {
    backgroundColor: colors.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  flatContainer: { padding: 10, backgroundColor: colors.background, width: '100%' },
  boxItem: {
    borderRadius: 5,
    backgroundColor: colors.whiteSmoke,
    marginBottom: 10
  },
  boxHeader: {
    borderBottomColor: colors.white,
    padding: 10,
    justifyContent: 'space-between'
  },
  boxContent: {
    flex: 3,
    paddingLeft: 10
  },
  itemName: {
    color: colors.redBold,
    fontSize: fontSizes.smaller,
    fontWeight: 'bold'
  },
  itemDescription: {
    color: colors.labelColor,
    fontSize: fontSizes.smallest,
    fontWeight: 'normal'
  },
  boxFooter: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'space-between'
  },
  btnAccept: {
    width: '45%',
    backgroundColor: '#3578e5',
    borderRadius: 10,
    textTransform: "none",
    padding: 10
  },
  btnCancel: {
    width: '45%',
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    textTransform: "none",
    padding: 10
  },
  btnText: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '500'
  }
});

export default styles;
