import styles from "./styles/manage-date.module.css";

interface IManageDateProps {
  daysShowingPointer: number;
  yearsPointer: number;
  setDaysShowingPointer: React.Dispatch<React.SetStateAction<number>>;
  setYearsPointer: React.Dispatch<React.SetStateAction<number>>;
  daysShowing: number[];
  years: string[];
}

const ManageDate = ({
  daysShowingPointer,
  yearsPointer,
  setDaysShowingPointer,
  setYearsPointer,
  daysShowing,
  years,
}: IManageDateProps) => {
  const prevYear = () => {
    setYearsPointer((prevYearPointer) =>
      prevYearPointer - 1 >= 0 ? prevYearPointer - 1 : years.length - 1
    );
  };

  const nextYear = () => {
    setYearsPointer((prevYearPointer) =>
      prevYearPointer + 1 <= years.length - 1 ? prevYearPointer + 1 : 0
    );
  };

  const prevDaysShowing = () => {
    setDaysShowingPointer((prevPointer) =>
      prevPointer - 1 >= 0 ? prevPointer - 1 : daysShowing.length - 1
    );
  };

  const nextDaysShowing = () => {
    setDaysShowingPointer((prevPointer) =>
      prevPointer + 1 <= daysShowing.length - 1 ? prevPointer + 1 : 0
    );
  };
  return (
    <div className={styles.datesContainer}>
      <div className={styles.daysContainer}>
        <button className={styles.daysButton} onClick={prevDaysShowing}>
          {"<"}
        </button>
        <p className={styles.daysNum}>{daysShowing[daysShowingPointer]}</p>
        <button className={styles.daysButton} onClick={nextDaysShowing}>
          {">"}
        </button>
      </div>
      <div className={styles.daysContainer}>
        <button className={styles.daysButton} onClick={prevYear}>
          {"<"}
        </button>
        <p className={styles.daysNum}>{years[yearsPointer]}</p>
        <button className={styles.daysButton} onClick={nextYear}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ManageDate;
