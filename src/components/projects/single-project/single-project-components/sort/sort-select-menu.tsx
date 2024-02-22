import styles from "./styles/sort-select-menu.module.css";
import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";
import SortItem from "./sort-item";

interface IConfigOrTotalObj {
  [index: string]: number | boolean | object;
}
interface ISortSelectMenuProps {
  sortConfig: ISortConfigAndSortTallies;
  // setConfig: (newConfig: ISortConfigAndSortTallies) => void;
  setConfig: (newConf: ISortConfigAndSortTallies) => void;
  path: string[];
  label: string;
}

const SortSelectMenu = ({
  sortConfig,
  setConfig,
  path,
  label,
}: ISortSelectMenuProps) => {
  const pathLvl = (currObj: IConfigOrTotalObj, property: string) =>
    currObj[property];
  const getConfigPaths = (obj: IConfigOrTotalObj, useUS?: boolean) => {
    let curr = { ...obj };
    path.forEach((property) => {
      curr = pathLvl(curr, property) as IConfigOrTotalObj;
    });
    if (useUS) {
      curr = curr["US"] as IConfigOrTotalObj;
    }
    return curr;
  };
  const config = getConfigPaths(sortConfig.config);
  const totals = getConfigPaths(sortConfig.totals);
  const configs = Object.keys(config); //ex: ["Chromium, "Other", "Safari"]

  const updateConfig = (property: string, useUS?: boolean) => {
    const existingConfig: ISortConfigAndSortTallies = { ...sortConfig };
    const configsPath = getConfigPaths(
      existingConfig.config,
      useUS ? true : false
    );
    const currPropertyVal = configsPath[property];
    configsPath[property] = !currPropertyVal;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setConfig(existingConfig);
  };

  const renderObjectIntoItems = (
    keysArray: string[],
    source: IConfigOrTotalObj,
    totalsSource: IConfigOrTotalObj
  ) => {
    if (
      keysArray.length === 0 ||
      (keysArray.length === 1 && keysArray[0] === "US")
    ) {
      return <label>No Data Found</label>;
    }
    const items: [React.ReactNode, number][] = [];
    const getItems = (
      keysArray: string[],
      source: IConfigOrTotalObj,
      totalsSource: IConfigOrTotalObj,
      useUS?: boolean
    ) => {
      keysArray.map((configOption) => {
        if (configOption === "US") {
          // getItems(
          //   Object.keys(source["US"]),
          //   config["US"] as IConfigOrTotalObj,
          //   totalsSource["US"] as IConfigOrTotalObj,
          //   true
          // );
        } else {
          items.push([
            <SortItem
              key={configOption + Math.random()}
              title={configOption}
              enabledValue={!!source[configOption]}
              totalsValue={totalsSource[configOption] as number}
              updateConfig={updateConfig}
              US={useUS ? true : false}
            />,
            totalsSource[configOption] as number,
          ]);
        }
      });
    };
    getItems(keysArray, source, totalsSource);

    items.sort((a, b) => b[1] - a[1]); //displays items largest => smallest
    return items.map((item) => item[0]); //removes reference number used to sort before rendering
  };

  return (
    <div className={styles.selectMenuContainer}>
      <label className={styles.categoryLabel}>{label}</label>
      <div className={styles.itemsContainer}>
        {renderObjectIntoItems(configs, config, totals)}
      </div>
    </div>
  );
};

export default SortSelectMenu;
