import { AsyncStorage } from "react-native";

import { STORAGE_KEY } from "../constants";

export const commitState = async currentState => {
	await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
};

export const retrieveState = async () => {
	const state = await AsyncStorage.getItem(STORAGE_KEY);

	return state
		? JSON.parse(state)
		: {
				members: [],
				destinations: [],
				recipients: []
		  };
};
