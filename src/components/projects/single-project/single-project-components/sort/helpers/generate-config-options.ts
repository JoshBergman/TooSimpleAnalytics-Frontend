/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO Properly type this monster, originally made in javascript due to types being a pita.

interface IDataEntry {
  [dataName: string]: number;
}

interface IConfigEntry {
  [dataName: string]: boolean;
}

export interface ISortTallies {
  agent: {
    browser: IDataEntry;
    device: IDataEntry;
  };
  locations: {
    US: IDataEntry;
    [countryCode: string]: IDataEntry | number;
  };
}

export interface ISortConfig {
  agent: {
    browser: IConfigEntry;
    device: IConfigEntry;
  };
  locations: {
    US: IConfigEntry;
    [countryCode: string]: IConfigEntry | boolean;
  };
}

export interface ISortConfigAndSortTallies {
  totals: ISortTallies;
  config: ISortConfig;
}

//messy solution to safeguard objects for the time being, will redo this monster soon
const typechecker = (objToCheck: object) => {
  // required: agent => browser, device
  // required: locations => US
  const checkProp = (
    obj: { [property: string]: any },
    properties: string[]
  ) => {
    properties.forEach((property) => {
      if (!obj.hasOwnProperty(property)) {
        obj[property] = {};
      }
    });
    return obj[properties[0]] as object;
  };
  checkProp(checkProp(objToCheck, ["agent"]), ["browser", "device"]);
  checkProp(checkProp(objToCheck, ["locations"]), ["US"]);
};

export const parseViewDates = (viewDatesObj: any) => {
  //returns two objects: totals (tallies) and config (true/false values for user sorting)

  //parse viewDates Object into totals of the data, stored as "tallies"
  const tallies = parseViewDatesToTallies(viewDatesObj);
  function parseViewDatesToTallies(source: any) {
    const counted = {};
    const nested = {};
    countAll(source, counted); //counts all nested properties (makes totals)
    nesty(source, nested); //creates object structure matching viewdates props
    fillNesty(counted, nested); //applies the counted totals to the properly nested object
    //Breaking the logic into these 3 functions is a life-saver of maintainability

    return nested;

    function fillNesty(
      count: { [key: string]: number | object },
      nes: { [key: string]: number | object }
    ) {
      for (const key in nes) {
        if (typeof nes[key] === "object") {
          fillNesty(count, nes[key] as { [key: string]: number | object });
        }
        if (typeof nes[key] === "number") {
          nes[key] = count[key];
        }
      }
    }

    function nesty(
      source: { [key: string]: number | object },
      target: { [key: string]: number | object }
    ) {
      for (const key in source) {
        if (Number.isInteger(parseInt(key))) {
          nesty(source[key] as { [key: string]: number | object }, target);
        } else {
          if (typeof source[key] === "object") {
            if (!target[key]) {
              target[key] = {};
            }
            nesty(
              source[key] as { [key: string]: number | object },
              target[key] as { [key: string]: number | object }
            );
          }
          if (typeof source[key] === "number") {
            target[key] = 0;
          }
        }
      }
    }

    function countAll(
      source: { [key: string]: number | object },
      target: { [key: string]: number | object }
    ) {
      for (const key in source) {
        if (typeof source[key] === "object") {
          countAll(source[key] as { [key: string]: number | object }, target);
        } else {
          if (!target[key]) {
            target[key] = 0;
          }
          //@ts-expect-error throws error even after being type-checked. Dont have the time to type everything atm
          target[key] += source[key];
        }
      }
    }
  }

  //convert the tallies (totals) into a configuration object used to keep track of what data points the user wants to show
  const generateConfigBasedOffTallies = (
    tallies: object,
    defaultConfigValue: boolean
  ) => {
    const generateConfig = (
      tallies: { [x: string]: any },
      configpath: { [x: string]: any }
    ) => {
      const keys = Object.keys(tallies);
      keys.forEach((key) => {
        if (typeof tallies[key] === "object") {
          configpath[key] = {};
          generateConfig(tallies[key], configpath[key]);
        } else {
          configpath[key] = defaultConfigValue;
        }
      });
    };
    const config = {};
    generateConfig(tallies, config);

    return config;
  };

  const tals = parseViewDatesToTallies(Object.assign({}, viewDatesObj));
  const conf = generateConfigBasedOffTallies(tallies, true);

  //type-check to ensure tals and config have required props
  typechecker(tals);
  typechecker(conf);
  return { totals: tals, config: conf } as ISortConfigAndSortTallies;
};

export const getDefaultSortConfig = () => {
  const tals = {};
  const conf = {};
  typechecker(tals);
  typechecker(conf);

  return { totals: tals, config: conf } as ISortConfigAndSortTallies;
};
