import { StyleSheet } from "react-native";
import colors from '../../configs/colors'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderWidth: 1
  },
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 20
  },
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#f2f2f2",
    backgroundColor: "#fff",
    elevation: 3,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleStyle: {
    color: "#000",
  },
  buttonSelected: {
    backgroundColor: "#CB5454",
  },
  titleSelected: {
    color: "#fff",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 30
  },
  alphabetContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
   
  },
  alphabetItem: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    width: 65,
    height: 65,
    marginBottom: 5,
  },
  modalbox: {
    height: 250,
  },
  icContainer: {
    position: 'absolute',
    right: -5,
    top: -5
  },
  icClose: {
    width: 30,
    height: 30,
    tintColor: "#000"
  },
  icSound: {
    width: 30,
    height: 30,
    tintColor: '#ff5f39'
  },
  icSoundContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10
  }
});
