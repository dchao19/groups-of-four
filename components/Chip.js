import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Chip = ({ selected = false, text, onPress, onLongPress }) => {
	return (
		<TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
			<View style={selected ? styles.chipSelected : styles.chip}>
				<Text style={selected ? styles.chip_textSelected : styles.chip_text}>
					{text}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	chip: {
		borderColor: "#0275d8",
		borderRadius: 4,
		borderWidth: 0.5,
		marginRight: 8,
		marginBottom: 8
	},
	chipSelected: {
		borderColor: "#0275d8",
		borderRadius: 4,
		borderWidth: 0.5,
		marginRight: 8,
		marginBottom: 8,
		backgroundColor: "#0275d8"
	},
	chip_text: {
		color: "#0275d8",
		fontSize: 20,
		margin: 5
	},
	chip_textSelected: {
		color: "#0275d8",
		fontSize: 20,
		margin: 5,
		color: "#FFF"
	}
});

export default Chip;
