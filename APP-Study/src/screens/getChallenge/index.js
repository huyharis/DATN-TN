import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import Loading from "@components/loading";
import Service from "@services";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Rating, AirbnbRating } from "react-native-elements";
import Styles from "./styles";

class GetChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Thử Thách",
    headerTitleStyle: { color: "#ffffff", fontSize: 20 },
    headerStyle: { backgroundColor: "#536DFE", color: "white" },
    headerTintColor: "white"
  });

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentDidMount() {
    this.setState({
      loading: true
    });

    {
      Service.getChallenge()
        .then(data => {
          this.setState({
            loading: false
          });
          this.setState({
            data: data.sort(function (a, b) {
              return a.level - b.level;
            })
          });
        })
        .catch(err => {
          this.setState({
            loading: true
          });
        });
    }
  }

  _handleMove = id => {

    this.props.navigation.navigate("GetDetailChallenge", { id_chal: id });
  };
  render() {
    const { data, loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
        <ScrollView>
          {data.length > 0
            ? data.map((val, index) => (
              <TouchableOpacity
                onPress={() => this._handleMove(val._id)}
                key={index}
                style={{ ...Styles.iteam, padding: 10 }}
              >
                <Text
                  style={{
                    color: "#FF6F00",
                    fontSize: 25,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  {val.question.replace(/&quot;/g, '"')}
                </Text>
                <Text
                  style={{ fontSize: 15, color: "gray", textAlign: "center" }}
                >
                  Cấp Độ:
                </Text>
                <Rating imageSize={15} readonly startingValue={val.level} />
              </TouchableOpacity>
            ))
            : null}
        </ScrollView>
        {loading && <Loading />}
      </View>
    );
  }
}

export default GetChallenge;
