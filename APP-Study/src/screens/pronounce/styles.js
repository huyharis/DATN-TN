import { StyleSheet } from 'react-native';
import colors from '../../configs/colors';

const styles = StyleSheet.create({
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
    paddingBottom: 0
},
  containerStyle: {
    backgroundColor: '#C0DDF4',
    borderRadius: 10,
    marginBottom: 10
  },
  titleHeader: {
    color: "#234958",
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textHeader: {
    color: "#234958",
    fontSize: 15,
    textAlign: 'center'
  },
  titleStyle: {
    fontWeight: 'bold',
    // fontSize: 15,
    color: '#2C6694'
  },
  subtitleStyle: {
    // fontSize: 12,
    color: '#2C6694'
  }
})

export default styles