import xml2json from "../util/xml2json";
import type {
  Dish,
  DownSignalEntry,
  DSNData,
  DSNResponse,
  ResponseDish,
  Spacecraft,
  TargetEntry,
  UpSignalEntry,
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
      "background: lightseagreen; color: white; padding: 3px;",
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
  console.log(
    "%cDSNDataForDisplay",
    "background: #333333; color: white; padding: 3px;",
    DSNDataForDisplay
  );
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
  // This will become type DSNData
  let serializedDSNData: any = {
    dishes,
    stations,
    timestamp,
  };

  // Loop over default dishes, and update with data from response
  const updatedDishes = defaultData.map((dish) => {
    const dishInResponse = jsonData["dish"].find(
      (responseDish) => responseDish["@name"] === dish["@name"]
    );
    if (dishInResponse) {
      return serializeResponseDish(dishInResponse);
    } else {
      return { ...dish };
    }
  });

  return { ...serializedDSNData, dishes: updatedDishes };
}

function serializeResponseDish(dish: ResponseDish): Dish {
  const { downSignal, upSignal, target, ...dishData } = dish;
  const targets = (Array.isArray(target) ? target : [target]).filter(
    (x) => !!x
  );
  // TODO: find better categorization than online/offline
  const status = targets.length > 0 ? "ONLINE" : "OFFLINE";
  // TODO: convert all number strings into Number types?
  return {
    ...dishData,
    // ensure all values are arrays and remove any falsey values (some data come back undefined)
    downSignal: (Array.isArray(downSignal) ? downSignal : [downSignal])
      .filter((x) => !!x)
      .map((s) => formatSignalValues(s)),
    upSignal: (Array.isArray(upSignal) ? upSignal : [upSignal])
      .filter((x) => !!x)
      .map((s) => formatSignalValues(s)),
    targets,
    metadata: {
      status,
      station: getStationByDishName(dish["@name"]),
    },
  };
}

export const getHumanReadableRange = (range: string): string => {
  // If there is no range provided, or invalid range
  if (!range || range.trim().length === 0 || Number(range) <= 0) {
    return "";
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

export const formatSignalValues = (
  signalEntry: DownSignalEntry | UpSignalEntry
): DownSignalEntry | UpSignalEntry => {
  let updatedEntry: DownSignalEntry | UpSignalEntry = {
    ...signalEntry,
    "@dataRate": formatDataRate(signalEntry["@dataRate"]),
    "@power": formatPower(signalEntry["@power"]),
    "@frequency": formatFrequency(signalEntry["@frequency"]),
  };

  return updatedEntry;
};

export const formatPower = (value: string): string => {
  if (!signalDataIsValid(value)) {
    return "N/A";
  } else {
    return `${(+value).toFixed(2)}dBm`;
    // If kw is needed this should work
    // return `${(parseInt(value, 10) * 100).toFixed(2)}kw`;
  }
};
export const formatFrequency = (value: string): string => {
  if (!signalDataIsValid(value)) {
    return "N/A";
  } else {
    return `${(parseFloat(value) / 1000000000).toFixed(2)}GHz`;
  }
};
export const formatDataRate = (value: string): string => {
  if (!signalDataIsValid(value)) {
    return "N/A";
  } else {
    return `${(parseFloat(value) / 1000).toFixed(2)}kb/s`;
  }
};

export const getHumanReadableLightTime = (rtlt: string): string => {
  if (!signalDataIsValid(rtlt) || +rtlt === -1) {
    return "";
  } else if (parseFloat(rtlt) > 3600) {
    return `${(parseFloat(rtlt) / 60 / 60).toFixed(2)} Light Hours`;
  } else if (parseFloat(rtlt) > 60) {
    return `${(parseFloat(rtlt) / 60).toFixed(2)} Light Minutes`;
  } else {
    return `${parseFloat(rtlt).toFixed(2)} Light Seconds`;
  }
};

const signalDataIsValid = (value: string): boolean => {
  if (
    value == undefined ||
    isNaN(+value) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return false;
  } else {
    return true;
  }
};

export const determineTargetStatus = (
  dish: Dish
): "NONE" | "IDLE" | "ACTIVE" => {
  if (!dish) {
    return "NONE";
  }

  if (dish["targets"] && dish["targets"].length > 0) {
    return "ACTIVE";
  }
  return "NONE";
};
export const determineSignalStatus = (
  dish: Dish,
  directionKey: "upSignal" | "downSignal"
): "NONE" | "IDLE" | "ACTIVE" => {
  if (!dish) {
    return "NONE";
  }

  if (dish[directionKey] && dish[directionKey].length > 0) {
    if (
      dish[directionKey].every(
        (signal) => signal["@signalType"] === "none" || !signal["@signalType"]
      )
    ) {
      return "IDLE";
    } else {
      return "ACTIVE";
    }
  }
  return "NONE";
};

export const updateStationCount = (
  data: DSNData
): {
  dishCountByStation: {
    Goldstone: number;
    Madrid: number;
    Canberra: number;
  };
  dishTotal: number;
} => {
  let tempCountByStation = {
    Goldstone: 0,
    Madrid: 0,
    Canberra: 0,
  };
  let dishTotal = 0;
  if (!data || !data["dishes"] || data["dishes"].length === 0) {
    return { dishCountByStation: tempCountByStation, dishTotal };
  }
  for (let dish of data["dishes"]) {
    // for each dish, incr the temp count for respective station
    const stationName = getStationByDishName(dish["@name"]);
    if (stationName && dish["metadata"]["status"] === "ONLINE") {
      tempCountByStation[stationName] = tempCountByStation[stationName] + 1;
      dishTotal += 1;
    }
  }
  return {
    dishCountByStation: tempCountByStation,
    dishTotal,
  };
};

export const getUniqueTargetList = (
  data: DSNData
): { id: string; name: string; longName: string }[] => {
  if (!data || data["dishes"].length === 0) {
    return [];
  }

  const fullList = [];
  // For every dish
  for (let dish of data["dishes"]) {
    // For every target
    for (let target of dish["targets"]) {
      // If it is not already in the fullList, add it
      if (!fullList.some((t) => t.id === target["@id"])) {
        fullList.push({
          id: target["@id"],
          name: target["@name"],
          longName: getSpacecraftDetails(target).longName,
        });
      }
    }
  }
  return fullList;
};

export const getSummarizedDataByStation = (
  stationName: "goldstone" | "madrid" | "canberra",
  dsnData: DSNData
): any[] => {
  const { dishes, stations } = dsnData;
  // TODO: Add station local time
  let summarizedDishList = [];

  // Get only dishes for specified station
  summarizedDishList = dishes.filter(
    (dish) =>
      dish.metadata.station.toLowerCase() === stationName &&
      dish["targets"].length > 0
  );

  // Only include signal status
  summarizedDishList = summarizedDishList.map((dish) => {
    const abbreviatedTargets = dish["targets"].map(
      (target: TargetEntry) => target["@name"]
    );
    const upSignalStatus = determineSignalStatus(dish, "upSignal");
    const downSignalStatus = determineSignalStatus(dish, "downSignal");
    return {
      "@name": dish["@name"],
      upSignalStatus,
      downSignalStatus,
      abbreviatedTargets,
    };
  });

  // array of objs
  // each obj is active dish at the station
  // dish, upSignalStatus, downSignalStatus, targets...

  console.log("getSummarizedDataByStation", {
    stationName,
    summarizedDishList,
  });

  return summarizedDishList;
};
