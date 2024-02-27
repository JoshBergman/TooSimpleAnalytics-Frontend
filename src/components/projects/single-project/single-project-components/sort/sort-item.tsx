import styles from "./styles/sort-item.module.css";

interface ISortItemProps {
  title: string;
  enabledValue: boolean;
  updateConfig: (property: string, useUS?: boolean) => void;
  totalsValue: number;
  categoryTotal: number;
  US?: boolean;
}

const SortItem = ({
  title,
  enabledValue,
  updateConfig,
  totalsValue,
  categoryTotal,
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

  const getBackground = (color1: string, dull: boolean) => {
    const color2 = dull
      ? "rgba(152, 152, 152, 0.074)"
      : "rgba(152, 152, 152, 0.274)";
    const filledIn = Math.floor((totalsValue / categoryTotal) * 100);

    return `linear-gradient(to right, ${color1} ${filledIn}%, ${color2} 0px)`;
  };

  return (
    <div
      className={styles.sortItemContainer}
      style={{
        background: enabledValue
          ? getBackground("var(--brand-1-opacity)", false)
          : getBackground("rgba(152, 152, 152, 0.774)", true),
      }}
      onClick={onChangeHandler}
      id={title + "box"}
    >
      <p className={styles.label}>
        {title[0].toUpperCase() + title.slice(1) + " "}
        {totalsValue}
      </p>
    </div>
  );
};

export default SortItem;
