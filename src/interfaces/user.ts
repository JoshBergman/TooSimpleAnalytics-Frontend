export interface IUser {
  item: string;
  actions: { [index: string]: () => void };
}
