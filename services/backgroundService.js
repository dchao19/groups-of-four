import { TaskManager, Location, Notifications } from "expo";

import { LOCATION_TASK, LeaveMessage, WelcomeMessage } from "../constants";
import {
	setTrackedRegion,
	getTrackedRegion,
	clearTrackedRegion
} from "../utils/storage";

const geofencingTask = async ({ data: { eventType, region }, error }) => {
	if (error) {
		//TODO: handle error
		return;
	}

	if (eventType === Location.GeofencingEventType.Enter) {
		const region = await getTrackedRegion();

		if (region) {
			await Notifications.presentLocalNotificationAsync({
				title: "Welcome home!",
				body: WelcomeMessage
			});
			await clearTrackedRegion();
			await Location.stopGeofencingAsync(LOCATION_TASK);

			return;
		}
	} else if (eventType === Location.GeofencingEventType.Exit) {
		await setTrackedRegion(region);
		try {
			await Notifications.presentLocalNotificationAsync({
				title: "You've left home!",
				body: LeaveMessage
			});
		} catch (e) {
			console.log(e);
		}
	}
};

export const registerGeofencingTask = () => {
	TaskManager.defineTask(LOCATION_TASK, geofencingTask);
};
