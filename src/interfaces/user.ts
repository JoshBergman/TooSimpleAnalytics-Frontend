export interface project {
  totalViews: number;
  dateYear?: {
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
    [index: string]: (...args: string[]) => void;
  };
}
