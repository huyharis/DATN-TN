import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "react-native-elements";

export default class InputCommon extends Component {
  onChangeStateHandle = (event = null) => {
    const { stateName } = this.props
    if (!stateName.id) {
      this.props.handleChange({
        [stateName]: event
      });
    } else {
      this.props.handleChange({
        [stateName.value]: event,
        id: stateName.id
      });
    }
  };
  render() {
    const {
      inputContainerStyle,
      placeholder,
      leftIcon,
      rightIcon,
      errorStyle,
      errorMessage,
      disabled,
      label,
      labelStyle,
      value,
      containerStyle,
      secureTextEntry,
      placeholderTextColor,
      inputStyle
    } = this.props;
    return (
      <Input
        containerStyle={containerStyle}
        value={value}
        onChangeText={this.onChangeStateHandle}
        inputContainerStyle={inputContainerStyle}
        labelStyle={labelStyle}
        label={label}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        errorStyle={errorStyle}
        errorMessage={errorMessage}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        inputStyle={inputStyle}
        autoFocus={this.props.autoFocus}
      />
    );
  }
}
InputCommon.defaultProps = {
  autoFocus: false,
  placeholderTextColor: "white",
  leftIcon: null,
  placeholder: null,
  rightIcon: null,
  errorStyle: { color: "red" },
  errorMessage: null,
  disabled: false,
  label: null,
  labelStyle: { color: "#FF9100" },
  inputContainerStyle: null,
  containerStyle: null,
  secureTextEntry: false,
  inputStyle: { borderBottomColor: "#FF9100", color: "white" }
};
InputCommon.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stateName: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  leftIcon: PropTypes.element,
  placeholder: PropTypes.string,
  rightIcon: PropTypes.element,
  errorStyle: PropTypes.object,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  secureTextEntry: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  inputStyle: PropTypes.object
};
