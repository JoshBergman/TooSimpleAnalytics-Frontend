import { ISortConfig, ISortTallies } from "./helpers/generate-config-options";
import SortItem from "./select-item";

interface ISortSelectMenuProps {
  config: ISortConfig;
  totals: ISortTallies;
}

const SortSelectMenu = ({ config, totals }: ISortSelectMenuProps) => {
  return (
    <div>
      {}
      {/* rendering of all menu items on config as selectItems */}
      <SortItem />
    </div>
  );
};

export default SortSelectMenu;
