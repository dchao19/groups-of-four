import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Chip from './Chip';

export default class DeletableChip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDeleting: false
        }

        this.handleLongPress = this.handleLongPress.bind(this);
        this.renderChip = this.renderChip.bind(this);
        this.renderDeleteChip = this.renderDeleteChip.bind(this);
    }

    handleLongPress() {
        this.setState({ isDeleting: true });
    }

    renderChip() {
        return (
            <Chip onLongPress={this.handleLongPress} {...this.props} />
        )
    }

    renderDeleteChip() {
        const { onDeleteConfirm } = this.props;

        return (
            <TouchableOpacity onPress={onDeleteConfirm}>
                <View style={styles.deleteChip}>
                    <Text style={styles.deleteChip_text}>delete</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return this.state.isDeleting ? this.renderDeleteChip() : this.renderChip()
    }
}

const styles = StyleSheet.create({
    deleteChip: {
        backgroundColor: "#d9534f",
        borderRadius: 4,
        marginRight: 8,
        marginBottom: 8
    },
    deleteChip_text: {
        color: "#fff",
        fontSize: 20,
        margin: 5
    }
})