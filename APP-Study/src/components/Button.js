import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as ElementButton } from "react-native-elements";
import { theme } from "../core/theme";

const Button = ({ mode, style, children, ...props }) => (
	<ElementButton
		containerStyle={[
			styles.button,
			mode === "clear" && { backgroundColor: theme.colors.primary },
			style
		]}
		labelStyle={styles.text}
		type={mode}
		{...props}
	>
		{/* {children} */}
	</ElementButton>
);

const styles = StyleSheet.create({
	button: {
		width: "100%",
		marginVertical: 10,
	},
	text: {
		fontWeight: "bold",
		fontSize: 15,
		lineHeight: 26
	}
});

export default memo(Button);
