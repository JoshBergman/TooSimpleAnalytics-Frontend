import { IUser } from "../../../../../interfaces/user";
import styles from "./styles/sort-data.module.css";
import SortSelectMenu from "./sort-select-menu";
import { ISortConfigAndSortTallies } from "./helpers/generate-config-options";

interface ISortDataProps {
  // setConfig: React.Dispatch<React.SetStateAction<ISortConfigAndSortTallies>>;
  setConfig: (newConf: ISortConfigAndSortTallies) => void;
  sortConfig: ISortConfigAndSortTallies;
  rawInfo: IUser["projects"]["x"];
}

const SortData = ({ setConfig, sortConfig }: ISortDataProps) => {
  return (
    <div className={styles.container}>
      <button
        onClick={() => console.log("Current config: ", sortConfig.config)}
      >
        Print config
      </button>
      <SortSelectMenu
        setConfig={setConfig}
        sortConfig={sortConfig}
        path={["agent", "browser"]}
      />
    </div>
  );
};

export default SortData;
