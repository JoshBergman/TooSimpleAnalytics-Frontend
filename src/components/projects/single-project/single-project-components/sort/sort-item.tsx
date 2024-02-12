interface ISortItemProps {
  title: string;
  totalsValue: number;
}

const SortItem = ({ title, totalsValue }: ISortItemProps) => {
  return (
    <div>
      <input type="checkbox" />
      <label>
        {title + " "}
        {totalsValue}
      </label>
    </div>
  );
};

export default SortItem;
