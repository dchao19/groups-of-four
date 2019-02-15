import { Permissions } from "expo";

export const requestNotificationPermission = async () => {
	await Permissions.askAsync(Permissions.NOTIFICATIONS);
};
