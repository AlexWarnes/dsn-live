import { get, writable } from 'svelte/store';
import type { Dish } from './Models';

export const filters = writable({
  visibleStations: ['GOLDSTONE', 'CANBERRA', 'MADRID'],
  onlyShowActiveDishes: false,
})

export const dishPassesFilters = (dish: Dish, filters): boolean => {
  // let currentFilters = get(filters);
  if ( !filters.visibleStations.includes(dish.metadata.station.toUpperCase())) {
    return false;
  }

  if(filters.onlyShowActiveDishes && dish['targets'].length === 0) {
    return false;
  }

  return true;
}