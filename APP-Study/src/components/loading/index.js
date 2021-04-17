import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";
import { loadingImage } from "@assets/index";
import styles from "./styles";

export default class Loadding extends Component {
  render() {
    const { sizeLoadding } = this.props;
    return (
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      </View>
    );
  }
}

Loadding.propTypes = {
  sizeLoadding: PropTypes.number
};
Loadding.defaultProps = {
  sizeLoadding: 50
};
