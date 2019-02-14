import React from 'react';
import { View, TouchableOpacity, Text, TextInput, Stylesheet } from 'react-native';

export default class AddButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            currentValue: ""
        }

        this.onAddPress = this.onAddPress.bind(this);
    }

    onAddPress() {
        console.log("here");
        this.props.onAddPress(this.state.currentValue);

        this.setState({ isEditing: false, currentValue: "" });
    }

    renderButton() {
        return (
            <TouchableOpacity
                onPress={() => this.setState({ isEditing: true })}
                style={{
                    borderRadius: 17.5,
                    width: 35,
                    height: 35,
                    borderWidth: "0.5",
                    borderColor: "#0275d8",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Text style={{ fontSize: 20, color: "#0275d8" }}>+</Text>
            </TouchableOpacity>
        );
    }

    renderField() {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <TextInput
                    value={this.state.currentValue}
                    onChangeText={(text) => this.setState({ currentValue: text })}
                    placeholder="type..."
                    style={{
                        width: 100,
                        fontSize: 20,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#0275d8",
                        marginRight: 8
                    }}
                />
                <TouchableOpacity onPress={this.onAddPress}>
                    <View
                        style={{
                            backgroundColor: "#0275d8",
                            borderRadius: 15,
                            width: 30,
                            height: 30,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text style={{
                            color: "#fff",
                            fontSize: 20
                        }}>✓</Text>
                    </View>
                </TouchableOpacity >
            </View >
        );
    }

    render() {
        return this.state.isEditing ? this.renderField() : this.renderButton();
    }


}