interface ISortItemProps {
  title: string;
  enabledValue: boolean;
  updateConfig: (property: string) => void;
  totalsValue: number;
}

const SortItem = ({
  title,
  enabledValue,
  updateConfig,
  totalsValue,
}: ISortItemProps) => {
  const onChangeHandler = () => {
    if (typeof title === "string" && title.length >= 1) {
      updateConfig(title);
    }
  };

  return (
    <div>
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
