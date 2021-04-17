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
    padding: 10,
    marginBottom: 20
  },
  questionContainer: {
    padding: 5
  },  
  questionText: {
    color: '#2C6694',
    fontWeight: 'bold'
  },
  answerContainer: {
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center'
  },
  answerText: {
    
  },
  controlContainer: {
    alignItems: 'flex-end',
    marginBottom: 20
  },
  scoreContainer: {
    flex: 1
  },  
  btnSubmit: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#C0DDF4'
  },
  btnReturn: {
    flex: 1,
    backgroundColor: '#16334A',
    marginTop: 20,
    marginRight: 5
  },
  btnTitleStyle: {
    color: '#fff',
    fontSize: 13
  },
});

export default styles;
