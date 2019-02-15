import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';

@connectActionSheet
export default class ContactItem extends React.Component {
    openActionSheet = () => {
        const options = this.props.phoneNumbers.map((phoneNumber) => `${phoneNumber.label} - ${phoneNumber.number}`);
        options.push("Cancel");

        const cancelButtonIndex = options.length - 1;

        this.props.showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, buttonIndex => {
            if (buttonIndex !== cancelButtonIndex) {
                this.props.onSelectNumber && this.props.onSelectNumber(this.props.phoneNumbers[buttonIndex])
            }
        });
    }

    render() {
        const { name, phoneNumbers } = this.props;

        return (
            <TouchableOpacity onPress={this.openActionSheet}>
                <View style={styles.contactContainer}>
                    <View style={styles.contactTextContainer}>
                        <Text style={styles.name}>{name}</Text>
                        <View style={styles.phoneNumbersContainer}>
                            {phoneNumbers && phoneNumbers.map((number, i) => [
                                i > 0 && <Text key={`separator-${i}`}>, </Text>,
                                <Text key={i} style={styles.phoneNumber}>{number.number}</Text>
                            ])}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    contactContainer: {
        borderTopColor: "lightgray",
        borderTopWidth: 0.25,
        borderBottomColor: "lightgray",
        borderBottomWidth: 0.25,
        alignItems: "stretch",
        justifyContent: "flex-start",
        marginLeft: 15,
        marginRight: 15

    },
    contactTextContainer: {
        paddingTop: 8,
        paddingBottom: 8,
        width: "100%",
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 3
    },
    phoneNumbersContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        width: "100%",
    },
    phoneNumber: {
        color: "gray"
    }
});