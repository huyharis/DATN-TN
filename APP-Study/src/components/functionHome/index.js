import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from './styles'

class Function extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.text}>{this.props.title}</Text>
        <View
          style={styles.viewBackGround}
        >
          <TouchableOpacity
            style={styles.touchable}
          >
            <Icon name={this.props.nameIcon} size={70} color={this.props.colorIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Function;
