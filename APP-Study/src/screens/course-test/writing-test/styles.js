import { StyleSheet } from 'react-native';
import colors from '../../../configs/colors';

const styles = StyleSheet.create({
  backarrow: {
    top: 7,
    width: 25,
    height: 25,
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
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  headerContainer: {
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    color: '#234958',
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: 13,
    color: '#234958',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#C0DDF4',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 15
  },
  boxText: {
    fontSize: 25,
    color: '#2C6694',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  progress: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#fff',
    borderWidth: 0
    // width: '90%'
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: '#C0DDF4'
  },
  inputStyle: {
    color: '#2C6694',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottomWidth: 0
  },
  cancelText: {
    color: '#FF7676',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5
  }
});

export default styles;
