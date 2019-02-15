import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView
} from "react-native";
import { sendSMSAsync, isAvailableAsync } from "expo-sms";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import _ from "lodash";

import DeletableChip from "./components/DeleteableChip.js";
import AddableChip from "./components/AddableChip.js";
import ContactsModal from "./components/ContactsModal/ContactsModal";
import PlusButton from "./components/PlusButton.js";

import { commitState, retrieveState } from "./utils/storage";

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			members: [],
			destinations: [],
			recipients: [],
			contactsModalVisible: false,
			loading: false
		};

		this.toggleChip = this.toggleChip.bind(this);
		this.contactAdd = this.contactAdd.bind(this);
		this.sendButtonClick = this.sendButtonClick.bind(this);
	}

	async componentDidMount() {
		this.setState({ loading: true });

		const { members, destinations, recipients } = await retrieveState();

		this.setState({ loading: false, members, destinations, recipients });
	}

	async toggleChip(category, index) {
		const newItems = _.cloneDeep(this.state[category]);

		newItems[index] = {
			...newItems[index],
			selected: !newItems[index].selected
		};

		this.setState({ [category]: newItems });

		await commitState({ ...this.state, [category]: newItems });
	}

	async deleteChip(category, index) {
		const newItems = this.state[category].filter((_, i) => i !== index);
		this.setState({ [category]: newItems });

		await commitState({ ...this.state, [category]: newItems });
	}

	async addChip(category, value) {
		const newItems = _.cloneDeep(this.state[category]);

		newItems.push({ value, selected: false });

		this.setState({ [category]: newItems });
		await commitState({ ...this.state, [category]: newItems });
	}

	contactAdd(contact) {
		this.addChip("recipients", contact);
		this.setState({ contactsModalVisible: false });
	}

	async sendButtonClick() {
		const members = this.state.members
			.filter(member => member.selected)
			.map(member => member.value);
		const destinations = this.state.destinations
			.filter(destination => destination.selected)
			.map(member => member.value);

		const recipients = this.state.recipients
			.filter(recipient => recipient.selected)
			.map(recipient => recipient.value.number);

		const allMembers = members.join(", ");
		const destination = destinations[0];

		const message = `${allMembers} ${
			members.length > 1 ? "are" : "is"
		} going to ${destination}`;

		const isAvailable = await isAvailableAsync();
		if (isAvailable) {
			await sendSMSAsync(recipients, message);
		} else {
			alert("SMS is not available on this platform!");
		}
	}

	render() {
		return (
			<ActionSheetProvider>
				<SafeAreaView style={styles.container}>
					<ContactsModal
						onClose={() => this.setState({ contactsModalVisible: false })}
						visible={this.state.contactsModalVisible}
						onSelectContact={this.contactAdd}
					/>
					<Text style={styles.header}>⬅️ Out</Text>
					<Text style={styles.step}>Members</Text>
					<View style={styles.chipsContainer}>
						{this.state.members.map((member, i) => {
							return (
								<DeletableChip
									key={`member-${member.value}`}
									onPress={() => this.toggleChip("members", i)}
									onDeleteConfirm={() => this.deleteChip("members", i)}
									text={member.value}
									selected={member.selected}
								/>
							);
						})}
						<AddableChip
							onAddPress={newValue => this.addChip("members", newValue)}
						/>
					</View>
					<Text style={styles.step}>Destination</Text>
					<View style={styles.chipsContainer}>
						{this.state.destinations.map((destination, i) => {
							return (
								<DeletableChip
									key={`destination-${destination.value}`}
									onPress={() => this.toggleChip("destinations", i)}
									onDeleteConfirm={() => this.deleteChip("destinations", i)}
									text={destination.value}
									selected={destination.selected}
								/>
							);
						})}
						<AddableChip
							onAddPress={newValue => this.addChip("destinations", newValue)}
						/>
					</View>
					<Text style={styles.step}>Recipient</Text>
					<View style={styles.chipsContainer}>
						{this.state.recipients.map((recipient, i) => {
							return (
								<DeletableChip
									key={`recipient-${recipient.value.name}`}
									onPress={() => this.toggleChip("recipients", i)}
									onDeleteConfirm={() => this.deleteChip("recipients", i)}
									text={recipient.value.name}
									selected={recipient.selected}
								/>
							);
						})}
						<PlusButton
							onPress={() => this.setState({ contactsModalVisible: true })}
						/>
					</View>
					<TouchableOpacity onPress={this.sendButtonClick}>
						<View style={styles.sendButton}>
							<Text style={styles.sendButton_text}>Send.</Text>
						</View>
					</TouchableOpacity>
				</SafeAreaView>
			</ActionSheetProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
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
		color: "white",
		marginTop: 15
	},
	sendButton_text: {
		color: "#FFF",
		fontSize: 30,
		margin: 15
	},
	chipsContainer: {
		flexDirection: "row",
		width: "100%",
		flexWrap: "wrap",
		marginBottom: 15
	}
});
