import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";
import SortItem from "./sort-item";

interface ISortSelectMenuProps {
  sortConfig: ISortConfigAndSortTallies;
  // setConfig: (newConfig: ISortConfigAndSortTallies) => void;
  setConfig: (newConf: ISortConfigAndSortTallies) => void;
  path: string[];
}

const SortSelectMenu = ({
  sortConfig,
  setConfig,
  path,
}: ISortSelectMenuProps) => {
  const pathLvl = (
    currObj: { [index: string]: number | object },
    property: string
  ) => currObj[property];
  const getConfigPaths = (obj: { [index: string]: number | object }) => {
    let curr = { ...obj };
    path.forEach((property) => {
      curr = pathLvl(curr, property);
    });

    return curr;
  };
  const config = getConfigPaths(sortConfig.config);
  const totals = getConfigPaths(sortConfig.totals);
  const configs = Object.keys(config); //ex: ["Chromium, "Other", "Safari"]

  const updateConfig = (property: string) => {
    const existingConfig: ISortConfigAndSortTallies = { ...sortConfig };
    const configsPath = getConfigPaths(existingConfig.config);
    const currPropertyVal = configsPath[property];
    configsPath[property] = !currPropertyVal;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setConfig(existingConfig);
  };

  return (
    <div>
      {configs.map((configOption) => {
        return (
          <SortItem
            key={configOption}
            title={configOption}
            enabledValue={config[configOption] as boolean}
            totalsValue={totals[configOption] as number}
            updateConfig={updateConfig}
          />
        );
      })}
    </div>
  );
};

export default SortSelectMenu;
