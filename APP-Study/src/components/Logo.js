import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";
import { LOGO } from '../assets';

const Logo = ({ style }) => (
	<Image source={LOGO} style={[styles.image, style]} />
);

const styles = StyleSheet.create({
	image: {
		width: 96,
		height: 96,
		// marginBottom: 12
	}
});

export default memo(Logo);
