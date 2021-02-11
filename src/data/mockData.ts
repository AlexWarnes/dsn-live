import type { DSNData } from "./Models";

export const generateMockData = (): DSNData => {
  console.log("new mock data");
  let angle = String(Math.floor(Math.random() * 90));
  return mockDSNDataForDisplay;
};

export const mockDSNDataForDisplay: DSNData = {
  dishes: [
    {
      "@name": "DSS14",
      "@azimuthAngle": "230.65",
      "@elevationAngle": "65.82",
      "@windSpeed": "0.00",
      "@isMSPA": "true",
      "@isArray": "false",
      "@isDDOR": "false",
      "@created": "2021-02-11T01:20:18.256Z",
      "@updated": "2021-02-11T01:21:18.594Z",
      downSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "IDLE OFF 0 MCD2",
          "@dataRate": "0.00kb/s",
          "@frequency": "8.44GHz",
          "@power": "-481.19dBm",
          "@spacecraft": "MRO",
          "@spacecraftId": "74",
        },
        {
          "@signalType": "none",
          "@signalTypeDebug": "IDLE OFF 0 MCD2",
          "@dataRate": "0.00kb/s",
          "@frequency": "8.41GHz",
          "@power": "-481.20dBm",
          "@spacecraft": "TGO",
          "@spacecraftId": "143",
        },
        {
          "@signalType": "data",
          "@signalTypeDebug": "IN LOCK OFF 1 MCD3",
          "@dataRate": "142.19kb/s",
          "@frequency": "8.41GHz",
          "@power": "-124.49dBm",
          "@spacecraft": "M01O",
          "@spacecraftId": "53",
        },
        {
          "@signalType": "none",
          "@signalTypeDebug": "IDLE OFF 0 MCD2",
          "@dataRate": "0.00kb/s",
          "@frequency": "8.42GHz",
          "@power": "-481.18dBm",
          "@spacecraft": "MEX",
          "@spacecraftId": "41",
        },
      ],
      upSignal: [
        {
          "@signalType": "data",
          "@signalTypeDebug": "ON 1 IDLE",
          "@power": "0.98dBm",
          "@frequency": "0.00GHz",
          "@dataRate": "N/A",
          "@spacecraft": "MRO",
          "@spacecraftId": "74",
        },
      ],
      targets: [
        {
          "@name": "M01O",
          "@id": "53",
          "@uplegRange": "1.92645295704E8",
          "@downlegRange": "1.92664279209E8",
          "@rtlt": "1285.190047",
        },
        {
          "@name": "MEX",
          "@id": "41",
          "@uplegRange": "-1.0",
          "@downlegRange": "-1.0",
          "@rtlt": "-1.0",
        },
        {
          "@name": "MRO",
          "@id": "74",
          "@uplegRange": "-1.0",
          "@downlegRange": "-1.0",
          "@rtlt": "-1.0",
        },
        {
          "@name": "TGO",
          "@id": "143",
          "@uplegRange": "-1.0",
          "@downlegRange": "-1.0",
          "@rtlt": "-1.0",
        },
      ],
      metadata: {
        status: "ONLINE",
        station: "Goldstone",
      },
    },
    {
      "@name": "DSS24",
      "@azimuthAngle": "",
      "@elevationAngle": "",
      "@windSpeed": "",
      "@isMSPA": "false",
      "@isArray": "false",
      "@isDDOR": "false",
      "@created": "2021-02-11T00:08:38.367Z",
      "@updated": "2021-02-11T00:08:38.367Z",
      downSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  -1 ",
          "@dataRate": "N/A",
          "@frequency": "N/A",
          "@power": "N/A",
          "@spacecraft": "MVN",
          "@spacecraftId": "202",
        },
      ],
      upSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  ",
          "@power": "N/A",
          "@frequency": "N/A",
          "@dataRate": "N/A",
          "@spacecraft": "MVN",
          "@spacecraftId": "202",
        },
      ],
      targets: [
        {
          "@name": "MVN",
          "@id": "202",
          "@uplegRange": "-1.0",
          "@downlegRange": "-1.0",
          "@rtlt": "-1.0",
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
      "@created": "2021-02-11T00:08:41.392Z",
      "@updated": "2021-02-11T00:08:41.392Z",
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
          "@uplegRange": "1.91210871302E8",
          "@downlegRange": "1.91224956498E8",
          "@rtlt": "1275.588857",
        },
      ],
      metadata: {
        status: "ONLINE",
        station: "Goldstone",
      },
    },
    {
      "@name": "DSS26",
      "@azimuthAngle": "",
      "@elevationAngle": "",
      "@windSpeed": "",
      "@isMSPA": "false",
      "@isArray": "false",
      "@isDDOR": "false",
      "@created": "2021-02-11T00:08:44.349Z",
      "@updated": "2021-02-11T00:08:44.349Z",
      downSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  -1 ",
          "@dataRate": "N/A",
          "@frequency": "N/A",
          "@power": "N/A",
          "@spacecraft": "EMM",
          "@spacecraftId": "62",
        },
      ],
      upSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  ",
          "@power": "N/A",
          "@frequency": "N/A",
          "@dataRate": "N/A",
          "@spacecraft": "EMM",
          "@spacecraftId": "62",
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
        station: "Goldstone",
      },
    },
    {
      "@name": "DSS34",
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
      "@name": "DSS35",
      "@azimuthAngle": "",
      "@elevationAngle": "",
      "@windSpeed": "",
      "@isMSPA": "false",
      "@isArray": "false",
      "@isDDOR": "false",
      "@created": "2021-02-11T00:09:36.420Z",
      "@updated": "2021-02-11T00:09:36.420Z",
      downSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  -1 ",
          "@dataRate": "N/A",
          "@frequency": "N/A",
          "@power": "N/A",
          "@spacecraft": "SPP",
          "@spacecraftId": "96",
        },
      ],
      upSignal: [
        {
          "@signalType": "none",
          "@signalTypeDebug": "  ",
          "@power": "N/A",
          "@frequency": "N/A",
          "@dataRate": "N/A",
          "@spacecraft": "SPP",
          "@spacecraftId": "96",
        },
      ],
      targets: [
        {
          "@name": "SPP",
          "@id": "96",
          "@uplegRange": "2.37672496372E8",
          "@downlegRange": "2.37631031745E8",
          "@rtlt": "1585.323377",
        },
      ],
      metadata: {
        status: "ONLINE",
        station: "Canberra",
      },
    },
    {
      "@name": "DSS36",
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
      "@name": "DSS63",
      "@azimuthAngle": "85.97",
      "@elevationAngle": "14.21",
      "@windSpeed": "0.00",
      "@isMSPA": "false",
      "@isArray": "false",
      "@isDDOR": "false",
      "@created": "2021-02-11T01:50:07.472Z",
      "@updated": "2021-02-11T01:50:12.093Z",
      downSignal: [
        {
          "@signalType": "data",
          "@signalTypeDebug": "IN LOCK OFF 1 MCD2",
          "@dataRate": "0.16kb/s",
          "@frequency": "8.42GHz",
          "@power": "-155.30dBm",
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
          "@uplegRange": "2.276716437849E10",
          "@downlegRange": "2.2764595659957E10",
          "@rtlt": "151880.286053",
        },
      ],
      metadata: {
        status: "ONLINE",
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
      targets: [
        {
          "@name": "VGR1",
          "@id": "31",
          "@uplegRange": "2.276716437849E10",
          "@downlegRange": "2.2764595659957E10",
          "@rtlt": "151880.286053",
        },
      ],
      downSignal: [],
      upSignal: [],
      metadata: {
        status: "OFFLINE",
        station: "Madrid",
      },
    },
  ],
  stations: [
    {
      "@name": "gdscc",
      "@friendlyName": "Goldstone",
      "@timeUTC": "1613011240721",
      "@timeZoneOffset": "-28800000",
    },
    {
      "@name": "mdscc",
      "@friendlyName": "Madrid",
      "@timeUTC": "1613011240721",
      "@timeZoneOffset": "3600000",
    },
    {
      "@name": "cdscc",
      "@friendlyName": "Canberra",
      "@timeUTC": "1613011240721",
      "@timeZoneOffset": "39600000",
    },
  ],
  timestamp: "1613011240720",
};