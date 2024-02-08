import { useState } from "react";
import { IUser, project } from "../../../../../interfaces/user";
import styles from "./styles/sort-data.module.css";
import SortSelectMenu from "./sort-select-menu";
import { parseViewDates } from "./helpers/generate-config-options";

interface ISortDataProps {
  setSortedInfo: React.Dispatch<React.SetStateAction<project>>;
  rawInfo: IUser["projects"]["x"];
}

const SortData = ({ setSortedInfo, rawInfo }: ISortDataProps) => {
  console.log(rawInfo);
  const [sortConfig, setSortConfig] = useState(
    parseViewDates(rawInfo.viewDates)
  );
  console.log(sortConfig);
  return (
    <div className={styles.container}>
      <SortSelectMenu /> |
      <SortSelectMenu />
    </div>
  );
};

export default SortData;
