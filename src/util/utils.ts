import xml2json from "../util/xml2json";
import type {
  Dish,
  DSNData,
  DSNResponse,
  Spacecraft,
  TargetEntry,
} from "../data/Models";
import {
  defaultDishList,
  dishToStationMap,
  spacecraftMap,
} from "../data/referenceData";
const parser = new DOMParser();

export function getStationByDishName(
  dishName: string
): "Goldstone" | "Canberra" | "Madrid" {
  return dishToStationMap[dishName] ? dishToStationMap[dishName] : undefined;
}

export function getSpacecraftDetails(target: TargetEntry): Spacecraft {
  const spacecraftDetails = spacecraftMap[removeAtSign(target["@id"])];
  if (!spacecraftDetails) {
    console.log(
      "%cNEW SPACECRAFT:",
      "background: lightseagreen; color: white;",
      target
    );
    return {
      id: target["@id"],
      shortName: target["@name"],
      longName: "UNKNOWN",
      sources: [],
    };
  }

  return spacecraftDetails;
}

export function removeAtSign(value: string): string {
  return value.replace("@", "");
}

export async function processDSNResponse(response: any): Promise<DSNData> {
  const textResponse = await response.text();
  const jsonResponse = parseDSNData(textResponse);

  // Merge data into Default Data (shows all dishes, even inactive)
  const DSNDataForDisplay: DSNData = generateDSNDataForUI(jsonResponse);
  console.log("DSNDataForDisplay", DSNDataForDisplay);
  return DSNDataForDisplay;
}

function parseDSNData(data): DSNResponse {
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const { dsn } = JSON.parse(xml2json(xmlDoc, ""));
  return dsn;
}

function generateDSNDataForUI(
  jsonData: DSNResponse,
  defaultData: Dish[] = defaultDishList
): DSNData {
  // updat the dish list by mapping over the default data, and grabbing from the DSN data if present
  const { dish: dishes, station: stations, timestamp } = jsonData;
  let serializedDSNData: DSNData = {
    dishes,
    stations,
    timestamp,
  };

  // Loop over default dishes, and update with data from response
  const updatedDishes = defaultDishList.map((dish) => {
    const dishInResponse = jsonData["dish"].find(
      (responseDish) => responseDish["@name"] === dish["@name"]
    );
    if (dishInResponse) {
      return serializeResponseDish(dishInResponse);
    } else {
      return dish;
    }
  });

  const compareFn = (a, b) => {
    if (a["metadata"]["status"] < b["metadata"]["status"]) {
      return 1;
    } else {
      return -1;
    }
  };
  const sortedDishes = updatedDishes.sort(compareFn);

  return { ...serializedDSNData, dishes: sortedDishes };
}

function serializeResponseDish(dish: Partial<Dish>): any {
  const { downSignal, upSignal, target } = dish;
  // TODO: find better categorization than online/offline
  const status = dish["@elevationAngle"] ? "ONLINE" : "OFFLINE";
  // TODO: convert all number strings into Number types?
  return {
    ...dish,
    // ensure all values are arrays and remove any falsey values (some data come back undefined)
    downSignal: (Array.isArray(downSignal) ? downSignal : [downSignal]).filter(
      (x) => !!x
    ),
    upSignal: (Array.isArray(upSignal) ? upSignal : [upSignal]).filter(
      (x) => !!x
    ),
    target: (Array.isArray(target) ? target : [target]).filter((x) => !!x),
    metadata: {
      status,
      station: getStationByDishName(dish["@name"]),
    },
  };
}

export const getHumanReadableRange = (range: string): string => {
  // If there is no range provided, or invalid range
  if (!range || range.trim().length === 0 || Number(range) <= 0) {
    return "N/A";
  }
  const rangeNum = Number(range);
  if (rangeNum > 999_999_999) {
    // if billions
    let xBillion = rangeNum / 1_000_000_000;
    return `${xBillion.toFixed(2)}B km`;
  } else if (rangeNum > 999_999) {
    // if millions
    let xMillion = rangeNum / 1_000_000;
    return `${xMillion.toFixed(2)}M km`;
  } else if (rangeNum > 999) {
    // if thousands
    let xThousand = rangeNum / 1_000;
    return `${xThousand.toFixed(2)}K km`;
  } else {
    return `${rangeNum.toFixed(2)} km`;
  }
};
