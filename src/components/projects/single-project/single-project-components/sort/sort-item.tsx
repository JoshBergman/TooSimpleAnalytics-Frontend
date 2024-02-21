import styles from "./styles/sort-item.module.css";

interface ISortItemProps {
  title: string;
  enabledValue: boolean;
  updateConfig: (property: string, useUS?: boolean) => void;
  totalsValue: number;
  US?: boolean;
}

const SortItem = ({
  title,
  enabledValue,
  updateConfig,
  totalsValue,
  US,
}: ISortItemProps) => {
  const onChangeHandler = () => {
    if (typeof title === "string" && title.length >= 1) {
      if (US) {
        updateConfig(title, true);
      } else {
        updateConfig(title);
      }
    }
  };

  return (
    <div className={styles.sortItemContainer}>
      <input
        onChange={onChangeHandler}
        checked={enabledValue}
        type="checkbox"
      />
      <label>
        {title + " "}
        {totalsValue}
      </label>
    </div>
  );
};

export default SortItem;
