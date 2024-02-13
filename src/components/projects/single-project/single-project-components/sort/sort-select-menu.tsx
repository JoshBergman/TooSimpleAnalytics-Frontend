import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";
import SortItem from "./sort-item";

interface ISortSelectMenuProps {
  sortConfig: ISortConfigAndSortTallies;
  setConfig: React.Dispatch<React.SetStateAction<ISortConfigAndSortTallies>>;
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
  const configs = Object.keys(config);

  const updateConfig = (property: string) => {
    setConfig((existingConfig) => {
      const path = getConfigPaths(existingConfig.config);
      const prop = path[property];
      path[property] = !prop;
      return existingConfig;
      // const currPathConfig = getConfigPaths(existingConfig.config);
      // console.log(currPathConfig[property]);
      return existingConfig;
    });
  };

  updateConfig("Safari");

  return (
    <div>
      {configs.map((configOption) => {
        return (
          <SortItem
            key={configOption}
            title={configOption}
            enabledValue={configs[configOption]}
            totalsValue={totals[configOption] as number}
            updateConfig={updateConfig}
          />
        );
      })}
    </div>
  );
};

export default SortSelectMenu;
