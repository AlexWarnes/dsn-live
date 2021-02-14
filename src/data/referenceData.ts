import type { Dish, Spacecraft } from "./Models";

export const dishToStationMap = {
  DSS26: "Goldstone",
  DSS25: "Goldstone",
  DSS24: "Goldstone",
  DSS14: "Goldstone",
  DSS34: "Canberra",
  DSS35: "Canberra",
  DSS36: "Canberra",
  DSS43: "Canberra",
  DSS54: "Madrid",
  DSS55: "Madrid",
  DSS56: "Madrid",
  DSS65: "Madrid",
  DSS63: "Madrid",
};

export const spacecraftMap = {
  96: {
    id: "96",
    shortName: "SPP",
    longName: "Parker Solar Probe",
    sources: [
      {
        title: "Parker Solar Probe, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Parker_Solar_Probe",
      },
      {
        title: "Parker Solar Probe, NASA",
        url: "https://www.nasa.gov/content/goddard/parker-solar-probe",
      },
    ],
  } as Spacecraft,
  234: {
    id: "234",
    shortName: "STA",
    longName: "STEREO A",
    sources: [
      {
        title: "STEREO, Wikipedia",
        url: "https://en.wikipedia.org/wiki/STEREO",
      },
      {
        title: "STEREO, NASA",
        url: "https://www.nasa.gov/mission_pages/stereo/main/index.html",
      },
    ],
  } as Spacecraft,
  64: {
    id: "64",
    shortName: "ORX",
    longName: "OSIRIS-REx",
    sources: [
      {
        title: "OSIRIS-REx, Wikipedia",
        url: "https://en.wikipedia.org/wiki/OSIRIS-REx",
      },
      {
        title: "OSIRIS-REx, NASA",
        url: "https://www.nasa.gov/osiris-rex",
      },
      {
        title: "OSIRIS-REx in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/osiris-rex/in-depth/",
      },
    ],
  } as Spacecraft,
  168: {
    id: "168",
    shortName: "M20",
    longName: "Mars 2020 (Perseverance)",
    sources: [
      {
        title: "Perseverance (rover), Wikipedia",
        url: "https://en.wikipedia.org/wiki/Perseverance_(rover)",
      },
      {
        title: "Perseverance, NASA Mars Missions",
        url: "https://mars.nasa.gov/mars2020/",
      },
      {
        title: "Perseverance, NASA",
        url: "https://www.nasa.gov/perseverance",
      },
    ],
  } as Spacecraft,
  62: {
    id: "62",
    shortName: "EMM",
    longName: "Emirates Mars Mission (Hope)",
    sources: [
      {
        title: "Emirates Mars Mission (Hope), Wikipedia",
        url: "https://en.wikipedia.org/wiki/Emirates_Mars_Mission",
      },
      {
        title: "Emirates Mars Mission (Hope), UAE Space Agency",
        url: "https://www.emiratesmarsmission.ae/",
      },
    ],
  } as Spacecraft,
  202: {
    id: "202",
    shortName: "MVN",
    longName: "Mars Atmosphere and Volatile EvolutioN (MAVEN)",
    sources: [
      {
        title: "MAVEN, Wikipedia",
        url: "https://en.wikipedia.org/wiki/MAVEN",
      },
      {
        title: "MAVEN, NASA Mars Missions",
        url: "https://mars.nasa.gov/maven/",
      },
      {
        title: "MAVEN, NASA",
        url: "https://www.nasa.gov/mission_pages/maven/main/index.html",
      },
    ],
  } as Spacecraft,
  53: {
    id: "53",
    shortName: "M01O",
    longName: "Mars Odyssey",
    sources: [
      {
        title: "Mars Odyssey, Wikipedia",
        url: "https://en.wikipedia.org/wiki/2001_Mars_Odyssey",
      },
      {
        title: "Mars Odyssey, NASA Mars Missions",
        url: "https://mars.nasa.gov/odyssey/",
      },
    ],
  } as Spacecraft,
  76: {
    id: "76",
    shortName: "MSL",
    longName: "Mars Science Laboratory (Curiosity)",
    sources: [
      {
        title: "Curiosity (rover), Wikipedia",
        url: "https://en.wikipedia.org/wiki/Curiosity_(rover)",
      },
      {
        title: "Curiosity, NASA Mars Missions",
        url: "https://mars.nasa.gov/msl/home/",
      },
      {
        title: "Curiosity, NASA",
        url: "https://www.nasa.gov/mission_pages/msl/index.html",
      },
    ],
  } as Spacecraft,
  143: {
    id: "143",
    shortName: "TGO",
    longName: "Trace Gas Orbiter",
    sources: [
      {
        title: "Trace Gas Orbiter, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Trace_Gas_Orbiter",
      },
      {
        title: "Trace Gas Orbiter, European Space Agency (ESA)",
        url: "https://exploration.esa.int/web/mars/-/46475-trace-gas-orbiter",
      },
      {
        title: "Trace Gas Orbiter Instruments, European Space Agency (ESA)",
        url:
          "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars/Trace_Gas_Orbiter_instruments",
      },
    ],
  } as Spacecraft,
  74: {
    id: "74",
    shortName: "MRO",
    longName: "Mars Reconnaissance Orbiter",
    sources: [
      {
        title: "Mars Reconnaissance Orbiter, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Mars_Reconnaissance_Orbiter",
      },
      {
        title: "Mars Reconnaissance Orbiter, NASA Mars Missions",
        url: "https://mars.nasa.gov/mro/",
      },
      {
        title: "Mars Reconnaissance Orbiter, NASA",
        url: "https://www.nasa.gov/mission_pages/MRO/main/index.html",
      },
    ],
  } as Spacecraft,
  32: {
    id: "32",
    shortName: "VGR2",
    longName: "Voyager 2",
    sources: [
      {
        title: "Voyager 2, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Voyager_2",
      },
      {
        title: "Voyager 2, NASA/JPL",
        url: "https://voyager.jpl.nasa.gov/",
      },
      {
        title: "Voyager 2 in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/voyager-2/in-depth/",
      },
    ],
  } as Spacecraft,
  151: {
    id: "151",
    shortName: "CHDR",
    longName: "Chandra X-ray Observatory",
    sources: [
      {
        title: "Chandra X-ray Observatory, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Chandra_X-ray_Observatory",
      },
      {
        title: "Chandra X-ray Observatory, NASA",
        url: "https://www.nasa.gov/mission_pages/chandra/main/index.html",
      },
      {
        title: "Chandra X-ray Observatory, Harvard",
        url: "https://chandra.harvard.edu/",
      },
    ],
  } as Spacecraft,
  85: {
    id: "85",
    shortName: "LRO",
    longName: "Lunar Reconnaissance Orbiter",
    sources: [
      {
        title: "Lunar Reconnaissance Orbiter, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lunar_Reconnaissance_Orbiter",
      },
      {
        title: "Lunar Reconnaissance Orbiter, NASA",
        url: "https://www.nasa.gov/mission_pages/LRO/main/index.html",
      },
      {
        title: "Lunar Reconnaissance Orbiter Camera, ASU",
        url: "https://www.lroc.asu.edu/",
      },
    ],
  } as Spacecraft,
  21: {
    id: "21",
    shortName: "SOHO",
    longName: "Solar and Heliospheric Observatory",
    sources: [
      {
        title: "Solar and Heliospheric Observatory, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Solar_and_Heliospheric_Observatory",
      },
      {
        title:
          "Solar and Heliospheric Observatory, European Space Agency (ESA)",
        url:
          "https://www.esa.int/Science_Exploration/Space_Science/SOHO_overview2",
      },
      {
        title: "Solar and Heliospheric Observatory, NASA",
        url: "https://www.nasa.gov/mission_pages/soho/index.html",
      },
      {
        title: "SOHO in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/soho/in-depth/",
      },
    ],
  } as Spacecraft,
  31: {
    id: "31",
    shortName: "VGR1",
    longName: "Voyager 1",
    sources: [
      {
        title: "Voyager 1, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Voyager_1",
      },
      {
        title: "Voyager 1, NASA/JPL",
        url: "https://voyager.jpl.nasa.gov/",
      },
      {
        title: "Voyager 1, NASA",
        url: "https://www.nasa.gov/mission_pages/voyager/index.html",
      },
      {
        title: "Voyager 1 in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/voyager-1/in-depth/",
      },
    ],
  } as Spacecraft,
  1: {
    id: "1",
    shortName: "GTL",
    longName: "Geotail",
    sources: [
      {
        title: "Geotail, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Geotail",
      },
      {
        title: "Geotail, Japan Aerospace Exploration Agency (JAXA)",
        url:
          "http://www.isas.jaxa.jp/en/missions/spacecraft/current/geotail.html",
      },
      {
        title: "Geotail in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/geotail/in-depth/",
      },
    ],
  } as Spacecraft,
  50: {
    id: "50",
    shortName: "DSN",
    longName: "Testing",
    sources: [],
  } as Spacecraft,
  99: {
    id: "99",
    shortName: "TEST",
    longName: "Testing",
    sources: [],
  } as Spacecraft,
  61: {
    id: "61",
    shortName: "JNO",
    longName: "Juno",
    sources: [
      {
        title: "Juno, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Juno_(spacecraft)",
      },
      {
        title: "Juno, NASA",
        url: "https://www.nasa.gov/mission_pages/juno/main/index.html",
      },
      {
        title: "Juno in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/juno/overview/",
      },
      {
        title: "Juno, SWRI",
        url: "https://www.missionjuno.swri.edu/",
      },
    ],
  } as Spacecraft,
  78: {
    id: "78",
    shortName: "DSCO",
    longName: "Deep Space Climate Observatory",
    sources: [
      {
        title: "Deep Space Climate Observatory, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Deep_Space_Climate_Observatory",
      },
      {
        title: "Deep Space Climate Observatory, NOAA",
        url:
          "https://www.nesdis.noaa.gov/content/dscovr-deep-space-climate-observatory",
      },
    ],
  } as Spacecraft,
  217: {
    id: "217",
    shortName: "GBRA",
    longName: "Ground Based Radio Astronomy",
    sources: [
      {
        title: "Radio Telescope, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Radio_telescope",
      },
    ],
  } as Spacecraft,
  108: {
    id: "108",
    shortName: "MMS1",
    longName: "Magnetospheric Multiscale Mission 1",
    sources: [
      {
        title: "Magnetospheric Multiscale Mission, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Magnetospheric_Multiscale_Mission",
      },
      {
        title: "Magnetospheric Multiscale Mission, NASA",
        url: "https://www.nasa.gov/mission_pages/mms/index.html",
      },
    ],
  } as Spacecraft,
  109: {
    id: "109",
    shortName: "MMS2",
    longName: "Magnetospheric Multiscale Mission 2",
    sources: [
      {
        title: "Magnetospheric Multiscale Mission, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Magnetospheric_Multiscale_Mission",
      },
      {
        title: "Magnetospheric Multiscale Mission, NASA",
        url: "https://www.nasa.gov/mission_pages/mms/index.html",
      },
    ],
  } as Spacecraft,
  110: {
    id: "110",
    shortName: "MMS3",
    longName: "Magnetospheric Multiscale Mission 3",
    sources: [
      {
        title: "Magnetospheric Multiscale Mission, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Magnetospheric_Multiscale_Mission",
      },
      {
        title: "Magnetospheric Multiscale Mission, NASA",
        url: "https://www.nasa.gov/mission_pages/mms/index.html",
      },
    ],
  } as Spacecraft,
  113: {
    id: "113",
    shortName: "MMS4",
    longName: "Magnetospheric Multiscale Mission 4",
    sources: [
      {
        title: "Magnetospheric Multiscale Mission, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Magnetospheric_Multiscale_Mission",
      },
      {
        title: "Magnetospheric Multiscale Mission, NASA",
        url: "https://www.nasa.gov/mission_pages/mms/index.html",
      },
    ],
  } as Spacecraft,
  192: {
    id: "192",
    shortName: "THB",
    longName: "THEMIS B",
    sources: [
      {
        title: "THEMIS, Wikipedia",
        url: "https://en.wikipedia.org/wiki/THEMIS",
      },
      {
        title: "THEMIS and ARTEMIS, NASA",
        url: "https://www.nasa.gov/themis-and-artemis",
      },
    ],
  } as Spacecraft,
  193: {
    id: "193",
    shortName: "THC",
    longName: "THEMIS C",
    sources: [
      {
        title: "THEMIS, Wikipedia",
        url: "https://en.wikipedia.org/wiki/THEMIS",
      },
      {
        title: "THEMIS and ARTEMIS, NASA",
        url: "https://www.nasa.gov/themis-and-artemis",
      },
    ],
  } as Spacecraft,
  189: {
    id: "189",
    shortName: "NYST",
    longName: "InSight",
    sources: [
      {
        title: "InSight, Wikipedia",
        url: "https://en.wikipedia.org/wiki/InSight",
      },
      {
        title: "InSight, NASA",
        url: "https://www.nasa.gov/mission_pages/insight/main/index.html",
      },
      {
        title: "InSight in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/insight/in-depth/",
      },
      {
        title: "InSight, NASA Mars Missions",
        url: "https://mars.nasa.gov/insight/",
      },
    ],
  } as Spacecraft,
  41: {
    id: "41",
    shortName: "MEX",
    longName: "Mars Express",
    sources: [
      {
        title: "Mars Express, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Mars_Express",
      },
      {
        title: "Mars Express in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/mars-express/in-depth/",
      },
      {
        title: "Mars Express, European Space Agency (ESA)",
        url:
          "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
      },
    ],
  } as Spacecraft,
  92: {
    id: "92",
    shortName: "ACE",
    longName: "Advanced Composition Explorer",
    sources: [
      {
        title: "Advanced Composition Explorer, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Advanced_Composition_Explorer",
      },
      {
        title: "Advanced Composition Explorer in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/ace/in-depth/",
      },
    ],
  } as Spacecraft,
  98: {
    id: "98",
    shortName: "NHPC",
    longName: "New Horizons",
    sources: [
      {
        title: "New Horizons, Wikipedia",
        url: "https://en.wikipedia.org/wiki/New_Horizons",
      },
      {
        title: "New Horizons, NASA",
        url: "https://www.nasa.gov/mission_pages/newhorizons/main/index.html",
      },
      {
        title: "New Horizons in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/new-horizons/in-depth/",
      },
      {
        title: "New Horizons, Johns Hopkins Applied Physics Laboratory",
        url: "http://pluto.jhuapl.edu/",
      },
    ],
  } as Spacecraft,
  8: {
    id: "8",
    shortName: "WIND",
    longName: "WIND",
    sources: [
      {
        title: "WIND, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Wind_(spacecraft)",
      },
      {
        title: "WIND, NASA",
        url: "https://wind.nasa.gov/",
      },
    ],
  } as Spacecraft,

  95: {
    id: "95",
    shortName: "TESS",
    longName: "Transiting Exoplanet Survey Satellite",
    sources: [
      {
        title: "Transiting Exoplanet Survey Satellite, Wikipedia",
        url:
          "https://en.wikipedia.org/wiki/Transiting_Exoplanet_Survey_Satellite",
      },
      {
        title: "TESS Home, MIT",
        url: "https://tess.mit.edu/",
      },
      {
        title: "TESS Home, NASA",
        url: "https://exoplanets.nasa.gov/tess/",
      },
      {
        title: "About TESS, NASA",
        url: "https://www.nasa.gov/content/about-tess",
      },
    ],
  } as Spacecraft,
  39: {
    id: "39",
    shortName: "HMAP",
    longName: "Lunar Polar Hydrogen Mapper (LunaH-Map)",
    sources: [
      {
        title: "Lunar Polar Hydrogen Mapper, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Lunar_Polar_Hydrogen_Mapper",
      },
      {
        title: "LunaH-Map Home, ASU",
        url: "https://lunahmap.asu.edu/",
      },
    ],
  } as Spacecraft,
  199: {
    id: "199",
    shortName: "INTG",
    longName: "INTEGRAL",
    sources: [
      {
        title: "INTEGRAL, Wikipedia",
        url: "https://en.wikipedia.org/wiki/INTEGRAL",
      },
      {
        title: "INTEGRAL, European Space Agency (ESA)",
        url:
          "https://www.esa.int/Science_Exploration/Space_Science/Integral_overview",
      },
    ],
  } as Spacecraft,
  5: {
    id: "5",
    shortName: "PLC",
    longName: "Akatsuki",
    sources: [
      {
        title: "Akatsuki, Wikipedia",
        url: "https://en.wikipedia.org/wiki/Akatsuki_(spacecraft)",
      },
      {
        title: "Akatsuki, Japan Aerospace Exploration Agency (JAXA)",
        url: "http://www.stp.isas.jaxa.jp/venus/top_english.html",
      },
      {
        title: "Akatsuki in Depth, NASA Science",
        url: "https://solarsystem.nasa.gov/missions/akatsuki/in-depth/",
      },
    ],
  } as Spacecraft,
};

export const defaultDishList: Dish[] = [
  {
    "@name": "DSS14",
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
    metadata: { status: "OFFLINE", station: "Goldstone" },
  },
  {
    "@name": "DSS24",
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
    metadata: { status: "OFFLINE", station: "Goldstone" },
  },

  {
    "@name": "DSS25",
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
    metadata: { status: "OFFLINE", station: "Goldstone" },
  },
  {
    "@name": "DSS26",
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
    metadata: { status: "OFFLINE", station: "Goldstone" },
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
    metadata: { status: "OFFLINE", station: "Canberra" },
  },
  {
    "@name": "DSS35",
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
    metadata: { status: "OFFLINE", station: "Canberra" },
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
    metadata: { status: "OFFLINE", station: "Canberra" },
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
    metadata: { status: "OFFLINE", station: "Canberra" },
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
    metadata: { status: "OFFLINE", station: "Madrid" },
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
    metadata: { status: "OFFLINE", station: "Madrid" },
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
    metadata: { status: "OFFLINE", station: "Madrid" },
  },
  {
    "@name": "DSS63",
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
    metadata: { status: "OFFLINE", station: "Madrid" },
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
    metadata: { status: "OFFLINE", station: "Madrid" },
  },
];
