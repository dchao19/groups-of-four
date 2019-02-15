import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Stylesheet
} from "react-native";

const PlusButton = ({ onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={{
			borderRadius: 17.5,
			width: 35,
			height: 35,
			borderWidth: "0.5",
			borderColor: "#0275d8",
			alignItems: "center",
			justifyContent: "center"
		}}
	>
		<Text style={{ fontSize: 20, color: "#0275d8" }}>+</Text>
	</TouchableOpacity>
);

export default PlusButton;
