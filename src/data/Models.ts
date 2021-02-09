export interface DSNData {
  dishes: Dish[];
  stations: Station[] | any[]; //TODO: Model stations
  timestamp: string;
}
export interface DSNResponse {
  dish: ResponseDish[];
  station: Station[] | any[]; //TODO: Model stations
  timestamp: string;
}

// Dish interface after serializing response data
export interface Dish {
  "@name": string;
  "@azimuthAngle": string;
  "@elevationAngle": string;
  "@windSpeed": string;
  "@isMSPA": "true" | "false";
  "@isArray": "true" | "false";
  "@isDDOR": "true" | "false";
  "@created": string;
  "@updated": string;
  downSignal: DownSignalEntry[];
  upSignal: UpSignalEntry[];
  target?: any;
  targets: TargetEntry[];
  metadata: {
    status: "OFFLINE" | "ONLINE";
    station: "Goldstone" | "Canberra" | "Madrid";
  };
}

// Dish interface from response, before serialization
export interface ResponseDish {
  "@name": string;
  "@azimuthAngle": string;
  "@elevationAngle": string;
  "@windSpeed": string;
  "@isMSPA": "true" | "false";
  "@isArray": "true" | "false";
  "@isDDOR": "true" | "false";
  "@created": string;
  "@updated": string;
  downSignal: DownSignalEntry[];
  upSignal: UpSignalEntry[];
  target: TargetEntry[];
  metadata: {
    status: "OFFLINE" | "ONLINE";
    station: "Goldstone" | "Canberra" | "Madrid";
  };
}

export interface Spacecraft {
  id: string;
  shortName: string;
  longName: string;
  sources: Source[];
}

export interface Source {
  title: string;
  url: string;
}

export interface Station {}

export interface DownSignalEntry {
  "@signalType": "data" | "carrier" | "none";
  "@signalTypeDebug": string;
  "@dataRate": string;
  "@frequency": string;
  "@power": string;
  "@spacecraft": string;
  "@spacecraftId": string;
}

export interface UpSignalEntry {
  "@signalType": "data" | "carrier" | "none";
  "@signalTypeDebug": string;
  "@power": string;
  "@frequency": string;
  "@dataRate": string;
  "@spacecraft": string;
  "@spacecraftId": string;
}

export interface TargetEntry {
  "@name": string;
  "@id": string;
  "@uplegRange": string;
  "@downlegRange": string;
  "@rtlt": string;
}
