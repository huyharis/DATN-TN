import React, { useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import PropTypes from "prop-types";

function ActionModal(props) {
  const [visible, setVisible] = useState(true);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    setVisible(false);
  };
  return (
    <View>
      <Dialog.Container visible={props.visible}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Description>{props.content}</Dialog.Description>
        <Dialog.Button label={props.titleCancle} onPress={props._handleCancelModal} />
        <Dialog.Button label={props.nameAction} onPress={props._handleAction} />
      </Dialog.Container>
    </View>
  );
}
ActionModal.defaultProps = {
  titleCancle: 'Hủy',
 
};
ActionModal.propTypes = {
  titleCancle: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  nameAction: PropTypes.string,
  _handleCancelModal: PropTypes.func,
  _handleAction: PropTypes.func
};

export default ActionModal;
