import { StyleSheet, Dimensions } from 'react-native';

import { getWidthAndHeight } from '../../untils/dimensions'
const { width, height } = getWidthAndHeight();
const margin = width * 0.03;
const sidePadding = width * 0.05;
const topPadding = 0;

// width = 375 for IPhone X
const bottomPadding = 0;
export default StyleSheet.create({
  container: {
    width,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  containerNoShadow: {
    width
  },
  headerContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingTop: topPadding,
    paddingBottom: bottomPadding,
    paddingLeft: sidePadding,
    paddingRight: sidePadding,
  },
  headerText: {
    color: '#000',
    fontSize: 15,
    height: 25,
    top: 3,
    textAlign: 'center',
    width: width / 2
  },
  secondaryHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
    top: 10,
    left: 5,
    minWidth: 50,
  },
  styleTitle: {
    position: 'absolute',
    width, flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    alignItems: 'center'
  },
  secondaryHeaderImage: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  cancelText: {
    color: 'red'
  },
  doneText: {
    color: 'blue'
  },
  mark: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderColor: '#fff',
    backgroundColor: '#CF0A2C',
    width: 10,
    height: 10,
    borderRadius: 10,
    borderWidth: 1.5
  }
});
