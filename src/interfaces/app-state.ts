export interface IAppState {
  notifications: string[][];
  addNotification: (type: string, msg: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
