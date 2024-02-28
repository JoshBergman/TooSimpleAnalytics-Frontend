import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import styles from "../styles/manage-date.module.css";

interface IManageDateProps {
  daysShowingPointer: number;
  yearsPointer: number;
  setDaysShowingPointer: React.Dispatch<React.SetStateAction<number>>;
  setYearsPointer: React.Dispatch<React.SetStateAction<number>>;
  daysShowing: number[];
  queryNewDateInfo: (
    newYearsPointer: boolean | number,
    newDaysPointer: boolean | number
  ) => void;
  enableDateBtn: boolean;
  years: string[];
}

const ManageDate = ({
  daysShowingPointer,
  yearsPointer,
  setDaysShowingPointer,
  setYearsPointer,
  daysShowing,
  queryNewDateInfo,
  enableDateBtn,
  years,
}: IManageDateProps) => {
  const setToCurrYear = () => {
    //Switching years is only an option when using yearly viewer, therefore it will break the other view modes if not the current year.
    //hence it shall be reset if you switch out of the yearly viewer (aka switching the days)
    setYearsPointer(0); //The current year is always index: 0
  };

  const prevYear = () => {
    setYearsPointer((prevYearPointer) => {
      const newYearPointer =
        prevYearPointer - 1 >= 0 ? prevYearPointer - 1 : years.length - 1;
      queryNewDateInfo(newYearPointer, false);
      return newYearPointer;
    });
  };

  const nextYear = () => {
    setYearsPointer((prevYearPointer) => {
      const newYearPointer =
        prevYearPointer + 1 <= years.length - 1 ? prevYearPointer + 1 : 0;
      queryNewDateInfo(newYearPointer, false);
      return newYearPointer;
    });
  };

  const prevDaysShowing = () => {
    setToCurrYear();
    setDaysShowingPointer((prevPointer) => {
      const newDaysPointer =
        prevPointer - 1 >= 0 ? prevPointer - 1 : daysShowing.length - 1;
      queryNewDateInfo(false, newDaysPointer);
      return newDaysPointer;
    });
  };

  const nextDaysShowing = () => {
    setToCurrYear();
    setDaysShowingPointer((prevPointer) => {
      const newDaysPointer =
        prevPointer + 1 <= daysShowing.length - 1 ? prevPointer + 1 : 0;
      queryNewDateInfo(false, newDaysPointer);
      return newDaysPointer;
    });
  };

  //todo Break date buttons into a component
  return (
    <div className={styles.datesContainer}>
      <div className={styles.daysContainer}>
        <button
          className={styles.daysButton}
          onClick={prevDaysShowing}
          disabled={!enableDateBtn}
          style={{ color: enableDateBtn ? "inherit" : "gray" }}
        >
          {<IoIosArrowBack className={styles.arrowIcon} />}
        </button>
        <p className={styles.daysNum}>{daysShowing[daysShowingPointer]}d</p>
        <button
          className={styles.daysButton}
          onClick={nextDaysShowing}
          disabled={!enableDateBtn}
          style={{ color: enableDateBtn ? "inherit" : "gray" }}
        >
          {<IoIosArrowForward className={styles.arrowIcon} />}
        </button>
      </div>
      {daysShowing[daysShowingPointer] === 365 && (
        <div className={styles.daysContainer}>
          <button
            className={styles.daysButton}
            onClick={prevYear}
            disabled={!enableDateBtn}
            style={{ color: enableDateBtn ? "inherit" : "gray" }}
          >
            {<IoIosArrowBack className={styles.arrowIconSmall} />}
          </button>
          <p className={styles.yearsNum}>{years[yearsPointer]}</p>
          <button
            className={styles.daysButton}
            onClick={nextYear}
            disabled={!enableDateBtn}
            style={{ color: enableDateBtn ? "inherit" : "gray" }}
          >
            {<IoIosArrowForward className={styles.arrowIconSmall} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageDate;
