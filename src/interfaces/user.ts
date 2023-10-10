export interface project {
    totalViews: number;
    dated_views: {
      [year: string]: {
        [month: string]: {
          [day: string]: number
        }
      }
    }
}

export interface IUser {
  auth?: string | null;
  projects: {[projectName: string]: project};
  actions: { [index: string]: () => void };
}
