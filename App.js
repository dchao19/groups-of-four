import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import _ from "lodash";

import Chip from './components/Chip.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [
        {
          value: "Daniel",
          selected: true,
        },
        {
          value: "Gavin",
          selected: false,
        },
        {
          value: "Danielle",
          selected: false,
        }
      ],
      destinations: [
        {
          value: "food",
          selected: true,
        },
        {
          value: "dinner",
          selected: false,
        },
        {
          value: "McDonald's",
          selected: false,
        },
        {
          value: "crepes",
          selected: false,
        },
      ],
      recipients: [
        {
          value: "Ian",
          selected: true,
        },
        {
          value: "Mike",
          selected: false,
        },
        {
          value: "Jen",
          selected: false,
        },
        {
          value: "Eddie",
          selected: false,
        },
      ],
    }

    this.toggleChip = this.toggleChip.bind(this);
  }

  toggleChip(category, index) {
    const newItems = _.cloneDeep(this.state[category]);

    newItems[index] = {
      ...newItems[index],
      selected: !newItems[index].selected
    }

    this.setState({ [category]: newItems });
  }

  deleteChip(category, index) {
    const newItems = this.state[category].filter((_, i) => i !== index);
    this.setState({ [category]: newItems });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>⬅️ Out</Text>
        <Text style={styles.step}>Members</Text>
        <View style={styles.chipsContainer}>
          {this.state.members.map((member, i) => {
            return (
              <Chip
                key={`member-${i}`}
                onPress={() => this.toggleChip("members", i)}
                onDeleteConfirm={() => this.deleteChip("members", i)}
                text={member.value}
                selected={member.selected} />
            )
          })}
        </View>
        <Text style={styles.step}>Destination</Text>
        <View style={styles.chipsContainer}>
          {this.state.destinations.map((destination, i) => {
            return (
              <Chip
                key={`destination-${i}`}
                onPress={() => this.toggleChip("destinations", i)}
                onDeleteConfirm={() => this.deleteChip("destinations", i)}
                text={destination.value}
                selected={destination.selected} />
            )
          })}
        </View>
        <Text style={styles.step}>Recipient</Text>
        <View style={styles.chipsContainer}>
          {this.state.recipients.map((recipient, i) => {
            return (
              <Chip
                key={`recipient-${i}`}
                onPress={() => this.toggleChip("recipients", i)}
                onDeleteConfirm={() => this.deleteChip("recipients", i)}
                text={recipient.value}
                selected={recipient.selected} />
            )
          })}
        </View>
        <TouchableOpacity>
          <View style={styles.sendButton}>
            <Text style={styles.sendButton_text}>Send.</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 20
  },
  header: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 30
  },
  step: {
    fontSize: 30,
    marginBottom: 5
  },
  sendButton: {
    backgroundColor: "#5cb85c",
    borderRadius: 10,
    color: 'white',
    marginTop: 15
  },
  sendButton_text: {
    color: "#FFF",
    fontSize: 30,
    margin: 15,
  },
  chipsContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: 15
  }
});
