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
  const tallies = {};
  const parseViewDatesToTallies = (obj: { [x: string]: any }) => {
    const addObjects = (
      targetObj: { [x: string]: any },
      sourceObj: { [x: string]: any }
    ) => {
      const sourceKeys = Object.keys(sourceObj);

      sourceKeys.forEach((key) => {
        if (typeof sourceObj[key] !== "object") {
          if (targetObj[key]) {
            targetObj[key] += sourceObj[key];
          } else {
            targetObj[key] = sourceObj[key];
          }
        } else {
          if (!targetObj[key]) {
            targetObj[key] = {};
          }
          addObjects(targetObj[key], sourceObj[key]);
        }
      });
    };

    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (Number.isInteger(parseInt(key))) {
        parseViewDatesToTallies(obj[key]);
      } else {
        addObjects(tallies, obj);
      }
    });

    return tallies;
  };

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
