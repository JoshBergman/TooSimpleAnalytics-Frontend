export interface project {
  totalViews: number;
  viewDates?: {
    [year: string]: {
      [month: string]: {
        [day: string]: number;
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
