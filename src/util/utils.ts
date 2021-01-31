import { space } from "svelte/internal";
import type { Spacecraft } from "../data/Models";
import { dishToStationMap, spacecraftMap } from "../data/referenceData";

export function getStationByDishName(
  dishName: string
): "Goldstone" | "Canberra" | "Madrid" {
  return dishToStationMap[dishName] ? dishToStationMap[dishName] : undefined;
}

export function getSpacecraftDetails(spacecraftID: string): Spacecraft {
  if (!spacecraftID) {
    return;
  }

  return spacecraftMap[removeAtSign(spacecraftID)];
}

export function removeAtSign(value: string): string {
  return value.replace("@", "");
}
