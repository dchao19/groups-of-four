import { AsyncStorage } from "react-native";

import { STORAGE_KEY, TRACKED_REGION_KEY } from "../constants";

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

export const setTrackedRegion = async region => {
	await AsyncStorage.setItem(TRACKED_REGION_KEY, JSON.stringify(region));
};

export const getTrackedRegion = async () => {
	const region = await AsyncStorage.getItem(TRACKED_REGION_KEY);
	return region ? JSON.parse(region) : null;
};

export const clearTrackedRegion = async () => {
	await AsyncStorage.removeItem(TRACKED_REGION_KEY);
};
