import { useState } from "react";
import { IUser, project } from "../../../../../interfaces/user";
import styles from "./styles/sort-data.module.css";
import SortSelectMenu from "./sort-select-menu";
import {
  getDefaultSortConfig,
  parseViewDates,
} from "./helpers/generate-config-options";

interface ISortDataProps {
  setSortedInfo: React.Dispatch<React.SetStateAction<project>>;
  rawInfo: IUser["projects"]["x"];
}

const SortData = ({ setSortedInfo, rawInfo }: ISortDataProps) => {
  const [sortConfig, setSortConfig] = useState(
    rawInfo.viewDates
      ? parseViewDates(rawInfo.viewDates)
      : getDefaultSortConfig()
  );

  return (
    <div className={styles.container}>
      <button onClick={() => console.log(sortConfig.config)}>
        Print config
      </button>
      <SortSelectMenu sortConfig={sortConfig} path={["agent", "browser"]} />
    </div>
  );
};

export default SortData;
