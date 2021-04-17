import React, { memo } from "react";
import { View, StyleSheet, Text, TextInput as Input } from "react-native";
// import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

const TextInput = ({ errorText, style, ...props }) => (
	<View style={styles.container}>
		{props.labelTop ? <Text style={styles.label}>{props.labelTop}</Text> : null}
		<Input style={[styles.input, style]} {...props}></Input>
		{errorText ? <Text style={styles.error}>{errorText}</Text> : null}
	</View>
);

const styles = StyleSheet.create({
	label: {
		fontSize: 15
	},
	container: {
		width: "100%",
		borderWidth: 0
		// marginVertical: 5
	},
	input: {
		backgroundColor: "rgba(255,255,255,0.5)",
		borderWidth: 0,
		color: "#000",
		height: 50,
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10
	},
	error: {
		fontSize: 14,
		color: theme.colors.error
		// paddingHorizontal: 4
		// paddingTop: 0
	}
});

export default memo(TextInput);
