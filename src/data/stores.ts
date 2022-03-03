import { browser } from '$app/env';
import { derived, get, writable } from 'svelte/store';
import type { Dish, NotificationData, NotificationTrigger, Station_Cap, TargetDiffByDish } from './Models';
import { dishToStationMap, spacecraftMap, stationToDishMap } from './referenceData';

export const filters = writable({
	visibleStations: ['GOLDSTONE', 'CANBERRA', 'MADRID'],
	onlyShowActiveDishes: false
});

export const permissionToNotify = writable<'default' | 'denied' | 'granted'>('default');
export const notificationTriggers = writable<NotificationTrigger[]>([]);
if(browser && JSON.parse(localStorage.getItem('notificationTriggers'))){
  notificationTriggers.set(JSON.parse(localStorage.getItem('notificationTriggers')))
}
export const targetDiffByDish = writable<TargetDiffByDish>({});

export const dishPassesFilters = (dish: Dish, filters): boolean => {
	// let currentFilters = get(filters);
	if (!filters.visibleStations.includes(dish.metadata.station.toUpperCase())) {
		return false;
	}

	if (filters.onlyShowActiveDishes && dish['targets'].length === 0) {
		return false;
	}

	return true;
};

export const triggerActivated = (trigger: NotificationTrigger, diff) => {
	let activated = false;
	if (trigger.spacecraft.length > 0) {
		// match spacecraftID from trigger with diff
		// then check if matched ID aligns with dish/station trigger
	} else {
		// ANY spacecraft
		// check if any diff targets align with dish/station trigger
	}
	// diffHasStationUpdate(trigger.stations, diff);
	// diffHasDishUpdate(trigger.dishes, diff);
	// diffHasStationUpdate(trigger.stations, diff);
};

export function dishOrStationTriggerByTarget(trigger: NotificationTrigger, diff): any[] {
	let stationList: Station_Cap[] = ['GOLDSTONE', 'CANBERRA', 'MADRID'];
	let dishList = [];
	let triggerTargets =
		trigger.spacecraft.length > 0
			? trigger.spacecraft
			: Object.values(spacecraftMap).map((s) => s.id);

	if (trigger.dishes.length > 0 && trigger.stations.length > 0) {
		// only specified dishes and stations
		dishList = trigger.dishes;
		stationList = trigger.stations;
	} else if (trigger.dishes.length > 0 && trigger.stations.length === 0) {
		// only specified dishes
		dishList = trigger.dishes;
		stationList = [];
	} else if (trigger.dishes.length === 0 && trigger.stations.length > 0) {
		// only specified stations
		dishList = [];
		stationList = trigger.stations;
	}

	// May be duplicates if a specified station includes a specified dish
	const allTriggerDishes = [...dishList, ...reduceStationsToDishes(stationList)];

	// Remove duplicates
	const uniqueTriggerDishes = [...new Set(allTriggerDishes)];

	let matches = [];
	// Which of the targets come from a dish or station that is specified in the trigger?
	for (let dish of uniqueTriggerDishes) {
		for (let targetID of triggerTargets) {
			if (diff[dish]?.includes(targetID)) {
				// match target to dish!
				matches.push({ dish, targetID });
			}
		}
	}

  return matches;

	// let spacecraftMatches = [];
	// let stationMatches = [];
	// let dishMatches = [];
	// for (let match of matches) {
	// 	spacecraftMatches.push(spacecraftMap[match.targetID]['shortName']);
	// 	stationMatches.push(dishToStationMap[match.dish]);
	// 	dishMatches.push(match.dish);
	// }

  // const matchDetails: NotificationData = {
  //   spacecraft: spacecraftMatches.join(', '),
  //   station: stationMatches.join(', '),
  //   dish: dishMatches.join(', ')
  // }
	// console.log('matches:', matchDetails);
	// return matchDetails;
}

function reduceStationsToDishes(stationList: Station_Cap[]): string[] {
	let dishes = [];
	for (let station of stationList) {
		dishes = [...dishes, ...stationToDishMap[station]];
	}
	return dishes;
}

export const notifications = derived(
	[notificationTriggers, targetDiffByDish],
	([$triggers, $diff]) => {
		if ($triggers.length === 0) {
			return [];
		}

		const activatedTriggerData = [];
		for (let trigger of $triggers) {
			activatedTriggerData.push(...dishOrStationTriggerByTarget(trigger, $diff));
		}

		return activatedTriggerData;
	}
);

// SPACECRAFT: any or list
// DISH: any or list
// STATION: any or list

//
