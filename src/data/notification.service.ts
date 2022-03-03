import type { NotificationData } from './Models';
import { dishToStationMap, spacecraftMap } from './referenceData';

export const addORToList = (things: string[]) => {
	let shallowCopy = [...things];
	if (shallowCopy.length <= 1) {
		return shallowCopy;
	}

	// mutate
	shallowCopy[shallowCopy.length - 1] = `or ${shallowCopy[shallowCopy.length - 1]}`;

	return shallowCopy;
};

export const renderSpacecraftText = (craftIDs: string[]): string => {
	if (craftIDs.length === 0) {
		return 'any';
	} else {
		let shortNames = craftIDs.map((id) => spacecraftMap[id].shortName);
		return addORToList(shortNames).join(', ');
	}
};
export const renderStationAndDishText = (stationNames: string[], dishNames: string[]): string => {
	if (stationNames.length === 0 && dishNames.length === 0) {
		return '';
	} else if (stationNames.length > 0 && dishNames.length > 0) {
		return ` by ${addORToList(stationNames).join(', ')} station${stationNames.length > 1 ? 's' : ''}
    or dish${dishNames.length > 1 ? 'es' : ''} ${addORToList(dishNames).join(', ')}
    `;
	} else if (stationNames.length > 0 && dishNames.length === 0) {
		return ` by ${addORToList(stationNames).join(', ')} station${
			stationNames.length > 1 ? 's' : ''
		}`;
	} else if (stationNames.length === 0 && dishNames.length > 0) {
		return ` by dish${dishNames.length > 1 ? 'es' : ''} ${addORToList(dishNames).join(', ')}`;
	}
};

export const hydrateNotificationData = (match: { dish; targetID }): NotificationData => {
	return {
		spacecraft: spacecraftMap[match.targetID]['shortName'],
		dish: match.dish,
		station: dishToStationMap[match.dish]
	};
};
