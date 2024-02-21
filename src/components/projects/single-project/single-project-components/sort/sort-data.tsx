import styles from "./styles/sort-data.module.css";
import SortSelectMenu from "./sort-select-menu";
import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";

interface ISortDataProps {
  setConfig: (newConf: ISortConfigAndSortTallies) => void;
  sortConfig: ISortConfigAndSortTallies;
}

const SortData = ({ setConfig, sortConfig }: ISortDataProps) => {
  return (
    <div className={styles.container}>
      <SortSelectMenu
        setConfig={setConfig}
        sortConfig={sortConfig}
        path={["agent", "browser"]}
      />
      <SortSelectMenu
        setConfig={setConfig}
        sortConfig={sortConfig}
        path={["agent", "device"]}
      />
      <SortSelectMenu
        setConfig={setConfig}
        sortConfig={sortConfig}
        path={["locations"]}
      />
    </div>
  );
};

export default SortData;
