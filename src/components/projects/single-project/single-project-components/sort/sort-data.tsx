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
  console.log(rawInfo);
  const [sortConfig, setSortConfig] = useState(
    rawInfo.viewDates
      ? parseViewDates(rawInfo.viewDates)
      : getDefaultSortConfig()
  );
  console.log(sortConfig);
  return (
    <div className={styles.container}>
      <button onClick={() => console.log(sortConfig.config)}>
        Print config
      </button>
      <SortSelectMenu config_and_totals={sortConfig} /> |
      <SortSelectMenu config_and_totals={sortConfig} />
    </div>
  );
};

export default SortData;
