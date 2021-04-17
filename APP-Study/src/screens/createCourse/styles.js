import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    iteam:{ shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    },
    container:{ flex: 1, backgroundColor: "#FFEBEE" },
    plus:{
            alignItems:'center',
            justifyContent:'center',
            width: 70,
            height: 70,
            borderRadius: 70,
            backgroundColor: "#FF6D00",
            shadowOffset: { width: 10, height: 10 },
            shadowColor: "black",
            shadowOpacity: 1,
            elevation: 3,
            position: 'absolute',right: 0, bottom: 0,
            zIndex: 100
          }
})