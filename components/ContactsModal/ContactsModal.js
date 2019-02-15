import React from "react";
import { Permissions, Contacts } from "expo";
import { Modal, FlatList, Text, SafeAreaView } from "react-native";

import NavigationBar from "react-native-navbar";
import ContactItem from "./ContactItem";

export default class ContactsModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contacts: []
		};

		this.onShow = this.onShow.bind(this);
	}

	async onShow() {
		await Permissions.getAsync(Permissions.CONTACTS);

		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name]
		});

		this.setState({ contacts: data });
	}

	render() {
		const titleConfig = {
			title: "Select a contact"
		};

		const doneConfig = {
			title: "Cancel",
			handler: () => this.props.onClose && this.props.onClose()
		};

		const keyExtraction = (item, index) => item.id;

		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.props.visible}
				onShow={this.onShow}
				onRequestClose={() => {}}
			>
				<SafeAreaView>
					<NavigationBar
						style={{ borderBottomColor: "lightgray", borderBottomWidth: 0.5 }}
						title={titleConfig}
						leftButton={doneConfig}
					/>

					<FlatList
						data={this.state.contacts}
						keyExtractor={keyExtraction}
						renderItem={({ item }) => (
							<ContactItem
								onSelectNumber={phoneNumber =>
									this.props.onSelectContact({
										...item,
										number: phoneNumber.number
									})
								}
								{...item}
							/>
						)}
					/>
				</SafeAreaView>
			</Modal>
		);
	}
}
