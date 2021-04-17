import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{ 
        backgroundColor: "#fff", 
        flex: 1, 
        elevation: 5,
        paddingTop: 50
    },
    logoContainer: {
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        width: 150,
        height: 150,
    },
    header:{ 
        width: "100%", 
        height: 150, 
        backgroundColor: "#ffffff",
        justifyContent:'center',
        alignItems:'center'
    },
    avartar:{marginBottom:10 },
    scrollVew: { 
        flex: 1,
        padding: 10
    },
    listItem:{ 
        // flex: 1, 
        // backgroundColor: "#EDEDED",
        marginBottom: 7,
        borderRadius: 10,
        padding: 7,
        paddingLeft: 15,
        borderColor: "#BBDDEA",
        // borderColor: "#EDEDED",
        // backgroundColor: 'transparent'
    },
    titleItem: {
        fontSize: 20,
        color: '#16334A',
        fontWeight: 'bold'
    },
    subtitleItem: {
        color: '#16334A',
        fontSize: 14
    },
    badge: {
        color: '#ffffff',
        marginRight: 10
    }
})