import React from "react";
import {
	ImageBackground,
	StyleSheet,
	KeyboardAvoidingView,
	Platform
} from "react-native";

import { background } from "../assets";
const Background = ({ children, source, blurRadius }) => (
	<ImageBackground
		source={source || background}
		resizeMode="cover"
		style={styles.background}
		blurRadius={blurRadius}
	>
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
			{children}
		</KeyboardAvoidingView>
	</ImageBackground>
);

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%"
	},
	container: {
		flex: 2,
		padding: 15,
		paddingTop: 20,
		width: "100%",
		maxWidth: 380,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "flex-end"
	}
});

export default Background;
