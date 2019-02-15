import { Permissions, Location } from "expo";
import { LOCATION_TASK } from "../constants";

const requestLocationPermission = async () => {
	const { status } = await Permissions.askAsync(Permissions.LOCATION);
};

export const startGeofencing = async (latitude, longitude) => {
	await requestLocationPermission();

	Location.startGeofencingAsync(LOCATION_TASK, [
		{
			latitude: latitude,
			longitude: longitude,
			radius: 50,
			notifyOnEnter: true,
			notifyOnExit: true
		}
	]);
};

export const getLocation = async () => {
	await requestLocationPermission();

	const {
		coords: { latitude, longitude }
	} = await Location.getCurrentPositionAsync({
		accuracy: Location.Accuracy.High
	});

	return { latitude, longitude };
};
