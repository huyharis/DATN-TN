import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const PaperText = ({ children, style }) => (
    <Text 
        style={[
            styles.text,
            style
        ]}
    >
        {children}
    </Text>
)

const styles = StyleSheet.create({
	text: {
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default PaperText;
