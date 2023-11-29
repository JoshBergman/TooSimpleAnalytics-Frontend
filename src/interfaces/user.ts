interface IDayData {
  views?: number;
  agent?: {
    device?: {
      desktop?: number;
      mobile?: number;
    };
    browser?: {
      [browserBrand: string]: number;
    };
  };
  // The countryCode "US" will have another nested layer for each state where all other country codes will just have views for that country
  locations?: {
    [countryCode: string]: number | { [usStateCode: string]: number };
  };
}

export interface project {
  totalViews: number;
  viewDates?: {
    [year: string]: {
      [month: string]: {
        [day: string]: number | IDayData;
      };
    };
  };
}

export interface IUser {
  auth?: string | null;
  projects: { [projectName: string]: project };
  projectsID: null | string;
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [index: string]: (...args: any) => void;
  };
}
