import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";
import SortItem from "./sort-item";

interface ISortSelectMenuProps {
  sortConfig: ISortConfigAndSortTallies;
  path: string[];
}

const SortSelectMenu = ({ sortConfig, path }: ISortSelectMenuProps) => {
  const getConfigPaths = (obj: { [index: string]: number | object }) => {
    const pathLvl = (
      currObj: { [index: string]: number | object },
      property: string
    ) => currObj[property];

    let curr = { ...obj };
    path.forEach((property) => {
      curr = pathLvl(curr, property);
    });

    return curr;
  };
  const config = getConfigPaths(sortConfig.config);
  const totals = getConfigPaths(sortConfig.totals);
  const configs = Object.keys(config);
  console.log(config);
  console.log(totals);

  return (
    <div>
      {configs.map((configOption) => {
        return (
          <SortItem
            key={configOption}
            title={configOption}
            totalsValue={totals[configOption] as number}
          />
        );
      })}
      {/* rendering of all menu items on config as selectItems */}
    </div>
  );
};

export default SortSelectMenu;
