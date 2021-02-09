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

  // const compareFn = (a, b) => {
  //   if (a["metadata"]["status"] < b["metadata"]["status"]) {
  //     return 1;
  //   } else {
  //     return -1;
  //   }
  // };
  // const sortedDishes = updatedDishes.sort(compareFn);

  return { ...serializedDSNData, dishes: updatedDishes };
}

function serializeResponseDish(dish: ResponseDish): Dish {
  const { downSignal, upSignal, target } = dish;
  const targets = (Array.isArray(target) ? target : [target]).filter(
    (x) => !!x
  );
  // TODO: find better categorization than online/offline
  const status = targets.length > 0 ? "ONLINE" : "OFFLINE";
  // TODO: convert all number strings into Number types?
  return {
    ...dish,
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

export const generateMockData = (): DSNData => {
  let angle = String(Math.floor(Math.random() * 90));
  return {
    dishes: [
      {
        "@name": "DSS26",
        "@azimuthAngle": "180.00",
        "@elevationAngle": angle,
        "@windSpeed": "1.85",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T05:10:04.472Z",
        "@updated": "2021-02-08T05:10:09.623Z",
        downSignal: [
          {
            "@signalType": "carrier",
            "@signalTypeDebug": "IDLE OFF 0 TURBO",
            "@dataRate": "0.00kb/s",
            "@frequency": "8.40GHz",
            "@power": "-175.72dBm",
            "@spacecraft": "EMM",
            "@spacecraftId": "62",
          },
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 MCD3",
            "@dataRate": "66.36kb/s",
            "@frequency": "8.41GHz",
            "@power": "-135.67dBm",
            "@spacecraft": "M01O",
            "@spacecraftId": "53",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "none",
            "@power": "0.00dBm",
            "@frequency": "N/A",
            "@dataRate": "0.00kb/s",
            "@spacecraft": "",
            "@spacecraftId": "",
          },
          {
            "@signalType": "data",
            "@signalTypeDebug": "ON 1 TRK",
            "@power": "18.02dBm",
            "@frequency": "0.00GHz",
            "@dataRate": "N/A",
            "@spacecraft": "M01O",
            "@spacecraftId": "53",
          },
        ],
        targets: [
          {
            "@name": "EMM",
            "@id": "62",
            "@uplegRange": "-1.0",
            "@downlegRange": "-1.0",
            "@rtlt": "-1.0",
          },
          {
            "@name": "M20",
            "@id": "168",
            "@uplegRange": "1.86432223508E8",
            "@downlegRange": "1.86445986681E8",
            "@rtlt": "1243.709895",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Goldstone",
        },
      },
      {
        "@name": "DSS25",
        "@azimuthAngle": "",
        "@elevationAngle": "",
        "@windSpeed": "",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T00:08:40.594Z",
        "@updated": "2021-02-08T00:08:40.594Z",
        downSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "  -1 ",
            "@dataRate": "N/A",
            "@frequency": "N/A",
            "@power": "N/A",
            "@spacecraft": "M20",
            "@spacecraftId": "168",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "  ",
            "@power": "N/A",
            "@frequency": "N/A",
            "@dataRate": "N/A",
            "@spacecraft": "M20",
            "@spacecraftId": "168",
          },
        ],
        targets: [
          {
            "@name": "M20",
            "@id": "168",
            "@uplegRange": "1.86432223508E8",
            "@downlegRange": "1.86445986681E8",
            "@rtlt": "1243.709895",
          },
        ],
        metadata: {
          status: "OFFLINE",
          station: "Goldstone",
        },
      },
      {
        "@name": "DSS24",
        "@azimuthAngle": "266.56",
        "@elevationAngle": "37.22",
        "@windSpeed": "1.85",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T01:40:06.824Z",
        "@updated": "2021-02-08T01:40:12.280Z",
        downSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 MCD3",
            "@dataRate": "66.36kb/s",
            "@frequency": "8.41GHz",
            "@power": "-135.67dBm",
            "@spacecraft": "M01O",
            "@spacecraftId": "53",
          },
        ],
        upSignal: [
          {
            "@signalType": "data",
            "@signalTypeDebug": "ON 1 TRK",
            "@power": "18.02dBm",
            "@frequency": "0.00GHz",
            "@dataRate": "N/A",
            "@spacecraft": "M01O",
            "@spacecraftId": "53",
          },
        ],
        targets: [
          {
            "@name": "M01O",
            "@id": "53",
            "@uplegRange": "1.88397059592E8",
            "@downlegRange": "1.88416169035E8",
            "@rtlt": "1256.852234",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Goldstone",
        },
      },
      {
        "@name": "DSS14",
        "@azimuthAngle": "266.39",
        "@elevationAngle": "37.29",
        "@windSpeed": "0.00",
        "@isMSPA": "true",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T01:28:48.016Z",
        "@updated": "2021-02-08T03:55:05.454Z",
        downSignal: [
          {
            "@signalType": "carrier",
            "@signalTypeDebug": "IN LOCK OFF 1 UNC",
            "@dataRate": "3999.73kb/s",
            "@frequency": "8.44GHz",
            "@power": "-110.50dBm",
            "@spacecraft": "MRO",
            "@spacecraftId": "74",
          },
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 TURBO",
            "@dataRate": "0.00kb/s",
            "@frequency": "8.40GHz",
            "@power": "-480.17dBm",
            "@spacecraft": "MSL",
            "@spacecraftId": "76",
          },
          {
            "@signalType": "data",
            "@signalTypeDebug": "IN LOCK OFF 1 MCD2",
            "@dataRate": "0.01kb/s",
            "@frequency": "8.45GHz",
            "@power": "-144.00dBm",
            "@spacecraft": "MVN",
            "@spacecraftId": "202",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "OFF 0 IDLE",
            "@power": "0.00dBm",
            "@frequency": "0.00GHz",
            "@dataRate": "N/A",
            "@spacecraft": "MRO",
            "@spacecraftId": "74",
          },
        ],
        targets: [
          {
            "@name": "MRO",
            "@id": "74",
            "@uplegRange": "-1.0",
            "@downlegRange": "-1.0",
            "@rtlt": "-1.0",
          },
          {
            "@name": "MVN",
            "@id": "202",
            "@uplegRange": "-1.0",
            "@downlegRange": "-1.0",
            "@rtlt": "-1.0",
          },
          {
            "@name": "MSL",
            "@id": "76",
            "@uplegRange": "1.88398344673E8",
            "@downlegRange": "1.88415219386E8",
            "@rtlt": "1256.845898",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Goldstone",
        },
      },
      {
        "@name": "DSS34",
        "@azimuthAngle": "20.00",
        "@elevationAngle": "89.50",
        "@windSpeed": "3.70",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T04:45:08.412Z",
        "@updated": "2021-02-08T04:45:24.215Z",
        downSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 TURBO",
            "@dataRate": "0.00kb/s",
            "@frequency": "8.41GHz",
            "@power": "-164.28dBm",
            "@spacecraft": "M20",
            "@spacecraftId": "168",
          },
        ],
        upSignal: [
          {
            "@signalType": "carrier",
            "@signalTypeDebug": "ON 0 ",
            "@power": "18.44dBm",
            "@frequency": "0.00GHz",
            "@dataRate": "N/A",
            "@spacecraft": "M20",
            "@spacecraftId": "168",
          },
        ],
        targets: [
          {
            "@name": "M20",
            "@id": "168",
            "@uplegRange": "1.86441305247E8",
            "@downlegRange": "1.8645506925E8",
            "@rtlt": "1243.769612",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Canberra",
        },
      },
      {
        "@name": "DSS35",
        "@azimuthAngle": "0.10",
        "@elevationAngle": "89.98",
        "@windSpeed": "3.70",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T05:10:06.053Z",
        "@updated": "2021-02-08T05:10:11.309Z",
        downSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 TURBO",
            "@dataRate": "0.00kb/s",
            "@frequency": "8.40GHz",
            "@power": "-170.21dBm",
            "@spacecraft": "EMM",
            "@spacecraftId": "62",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "none",
            "@power": "0.00dBm",
            "@frequency": "N/A",
            "@dataRate": "0.00kb/s",
            "@spacecraft": "",
            "@spacecraftId": "",
          },
        ],
        targets: [
          {
            "@name": "EMM",
            "@id": "62",
            "@uplegRange": "-1.0",
            "@downlegRange": "-1.0",
            "@rtlt": "-1.0",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Canberra",
        },
      },
      {
        "@name": "DSS36",
        "@azimuthAngle": "294.98",
        "@elevationAngle": "54.60",
        "@windSpeed": "3.70",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T04:50:11.066Z",
        "@updated": "2021-02-08T04:50:25.269Z",
        downSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "IDLE OFF 0 MCD2",
            "@dataRate": "0.00kb/s",
            "@frequency": "2.28GHz",
            "@power": "-476.65dBm",
            "@spacecraft": "ACE",
            "@spacecraftId": "92",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "  ",
            "@power": "0.00dBm",
            "@frequency": "N/A",
            "@dataRate": "0.00kb/s",
            "@spacecraft": "ACE",
            "@spacecraftId": "92",
          },
        ],
        targets: [
          {
            "@name": "ACE",
            "@id": "92",
            "@uplegRange": "-1.0",
            "@downlegRange": "-1.0",
            "@rtlt": "-1.0",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Canberra",
        },
      },
      {
        "@name": "DSS43",
        "@azimuthAngle": null,
        "@elevationAngle": null,
        "@windSpeed": null,
        "@isMSPA": null,
        "@isArray": null,
        "@isDDOR": null,
        "@created": null,
        "@updated": null,
        targets: [],
        downSignal: [],
        upSignal: [],
        metadata: {
          status: "OFFLINE",
          station: "Canberra",
        },
      },
      {
        "@name": "DSS54",
        "@azimuthAngle": null,
        "@elevationAngle": null,
        "@windSpeed": null,
        "@isMSPA": null,
        "@isArray": null,
        "@isDDOR": null,
        "@created": null,
        "@updated": null,
        targets: [],
        downSignal: [],
        upSignal: [],
        metadata: {
          status: "OFFLINE",
          station: "Madrid",
        },
      },
      {
        "@name": "DSS55",
        "@azimuthAngle": null,
        "@elevationAngle": null,
        "@windSpeed": null,
        "@isMSPA": null,
        "@isArray": null,
        "@isDDOR": null,
        "@created": null,
        "@updated": null,
        targets: [],
        downSignal: [],
        upSignal: [],
        metadata: {
          status: "OFFLINE",
          station: "Madrid",
        },
      },
      {
        "@name": "DSS56",
        "@azimuthAngle": null,
        "@elevationAngle": null,
        "@windSpeed": null,
        "@isMSPA": null,
        "@isArray": null,
        "@isDDOR": null,
        "@created": null,
        "@updated": null,
        targets: [],
        downSignal: [],
        upSignal: [],
        metadata: {
          status: "OFFLINE",
          station: "Madrid",
        },
      },
      {
        "@name": "DSS65",
        "@azimuthAngle": null,
        "@elevationAngle": null,
        "@windSpeed": null,
        "@isMSPA": null,
        "@isArray": null,
        "@isDDOR": null,
        "@created": null,
        "@updated": null,
        targets: [],
        downSignal: [],
        upSignal: [],
        metadata: {
          status: "OFFLINE",
          station: "Madrid",
        },
      },
      {
        "@name": "DSS63",
        "@azimuthAngle": "111.71",
        "@elevationAngle": "40.74",
        "@windSpeed": "3.70",
        "@isMSPA": "false",
        "@isArray": "false",
        "@isDDOR": "false",
        "@created": "2021-02-08T02:05:05.980Z",
        "@updated": "2021-02-08T02:05:10.547Z",
        downSignal: [
          {
            "@signalType": "data",
            "@signalTypeDebug": "IN LOCK OFF 1 MCD2",
            "@dataRate": "0.16kb/s",
            "@frequency": "8.42GHz",
            "@power": "-155.14dBm",
            "@spacecraft": "VGR1",
            "@spacecraftId": "31",
          },
        ],
        upSignal: [
          {
            "@signalType": "none",
            "@signalTypeDebug": "none",
            "@power": "0.00dBm",
            "@frequency": "N/A",
            "@dataRate": "0.00kb/s",
            "@spacecraft": "",
            "@spacecraftId": "",
          },
        ],
        targets: [
          {
            "@name": "VGR1",
            "@id": "31",
            "@uplegRange": "2.2768464909419E10",
            "@downlegRange": "2.276589606761E10",
            "@rtlt": "151888.664418",
          },
        ],
        metadata: {
          status: "ONLINE",
          station: "Madrid",
        },
      },
    ],
    stations: [
      {
        "@name": "gdscc",
        "@friendlyName": "Goldstone",
        "@timeUTC": "1612761270742",
        "@timeZoneOffset": "-28800000",
      },
      {
        "@name": "mdscc",
        "@friendlyName": "Madrid",
        "@timeUTC": "1612761270744",
        "@timeZoneOffset": "3600000",
      },
      {
        "@name": "cdscc",
        "@friendlyName": "Canberra",
        "@timeUTC": "1612761270744",
        "@timeZoneOffset": "39600000",
      },
    ],
    timestamp: "1612761270741",
  };
};
