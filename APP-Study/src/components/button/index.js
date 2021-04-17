import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';

export default class ButtonCustom extends Component {
  render() {
    const {
      loading,
      title,
      icon,
      buttonStyle,
      disabled,
      marginTop,
      containerStyle,
      type,
      titleStyle,
      onPress,
    } = this.props;
    return (
      <Button
        onPress={onPress}
        loading={loading}
        title={title}
        icon={icon}
        buttonStyle={buttonStyle}
        disabled={disabled}
        marginTop={marginTop}
        containerStyle={containerStyle}
        titleStyle={titleStyle}
        type={type}
      />
    );
  }
}
ButtonCustom.defaultProps = {
  type: 'solid',
  containerStyle: null,
  loading: false,
  title: null,
  icon: null,
  buttonStyle: {backgroundColor: '#FF9100'},
  disabled: false,
  marginTop: null,
  titleStyle: {color: 'white'},
  onPress: null,
};
ButtonCustom.propTypes = {
  titleStyle: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.element,
  buttonStyle: PropTypes.object,
  disabled: PropTypes.bool,
  marginTop: PropTypes.object,
  containerStyle: PropTypes.object,
  type: PropTypes.string,
  onPress: PropTypes.func,
};
