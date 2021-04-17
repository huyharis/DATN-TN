import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Image,
  ScrollView,
  FlatList
} from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import Loading from "@components/loading";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SearchBar } from "react-native-elements";
import LanguageInFo from "@constants/language.json";
import Styles from "./styles";

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", data: LanguageInFo };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "",
      headerTitleStyle: { color: "#ffffff", fontSize: 20 },
      headerTintColor: "white",
      header: (
        <SearchBar
          value={navigation.getParam("search")}
          onChangeText={navigation.getParam("_handleChange")}
          placeholderTextColor={"white"}
          inputStyle={{ color: "white" }}
          searchIcon={<Icon name="search" color={"white"} size={16} />}
          inputContainerStyle={{ backgroundColor: "#3D5AFE" }}
          containerStyle={{
            height: 80,
            paddingTop: 20,
            backgroundColor: "#536DFE",
            borderBottomColor: "#536DFE"
          }}
          placeholder="Type Here..."
        />
      )
    };
  };
  componentDidMount() {
    // set handler method with setParams
    this.props.navigation.setParams({
      _handleChange: this._handleChange
    });
  }
  _handleChoose=(name,code)=>{
    const language={
      name,code,id:this.props.navigation.getParam("id")
    }
    this.props.navigation.navigate(
      'CreateCourse',
      { language },
    );
  }
  _handleChange = text => {
 const resuilt=   LanguageInFo.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) > -1)
    this.setState({
      search: text,
      data:resuilt
    });
    this.props.navigation.setParams({
      search: text
    });
  };
 
  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={this.state}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>this._handleChoose(item.name,item.code)} style={{padding:20,paddingTop:10,backgroundColor:'#ECEFF1'}} key={item.code}>
              <Text style={{fontSize:20}}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default Language;
