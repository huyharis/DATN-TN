import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';
import { Paragraph as Para  } from 'react-native-paper';
const Paragraph = ({ children, style }) => <Para style={[styles.text, style]}>{children}</Para>;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 21,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#7A7A7A',
    textAlign: 'center',
    // marginBottom: 14,
  },
});

export default memo(Paragraph);
