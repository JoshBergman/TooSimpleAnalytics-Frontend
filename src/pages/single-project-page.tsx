import { useContext, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/UI/header/header";
import SingleProject from "../components/projects/single-project/single-project";
import { UserContext } from "../store/user/user-context";
import styles from "./styles/single-project-page.module.css";

const SingleProjectPage = () => {
  const [daysShowingPointer, setDaysShowingPointer] = useState(0);
  const daysShowing = [7, 30, 90, 365, 999];
  const currProjRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const userCTX = useContext(UserContext).user;
  const projectNames = Object.keys(userCTX.projects);
  const { projectName } = useParams();

  const prevDaysShowing = () => {
    const currentShowingPointer = daysShowingPointer;
    if (currentShowingPointer <= 0) {
      setDaysShowingPointer(daysShowing.length - 1);
    } else {
      setDaysShowingPointer(currentShowingPointer - 1);
    }
  };

  const nextDaysShowing = () => {
    const currentShowingPointer = daysShowingPointer;
    if (currentShowingPointer >= daysShowing.length - 1) {
      setDaysShowingPointer(0);
    } else {
      setDaysShowingPointer(currentShowingPointer + 1);
    }
  };

  const projSelectChangeHandler = () => {
    const newProjName =
      currProjRef.current && currProjRef.current.value
        ? currProjRef.current.value
        : projectName;
    navigate(`/projects/${newProjName}`);
  };

  return (
    <>
      <Header />
      <div className={styles.topInfoContainer}>
        <div>
          <label className={styles.projSelectLabel} htmlFor="projSelect">
            Choose Project:
          </label>
          <select
            id="projSelect"
            onChange={projSelectChangeHandler}
            className={styles.projSelect}
            ref={currProjRef}
            defaultValue={projectName}
          >
            {projectNames.map((projName) => (
              <option key={projName} id={projName}>
                {projName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.daysContainer}>
          <button className={styles.daysButton} onClick={prevDaysShowing}>
            {"<"}
          </button>
          <p className={styles.daysNum}>{daysShowing[daysShowingPointer]}</p>
          <button className={styles.daysButton} onClick={nextDaysShowing}>
            {">"}
          </button>
        </div>
      </div>
      {projectName && projectNames.includes(projectName) ? (
        <SingleProject
          projectName={projectName}
          projectInfo={userCTX.projects[projectName]}
        />
      ) : (
        <h2>
          Loading... May take up to 20 seconds. (Or this project doesn{"'"}t
          exist!)
        </h2>
      )}
    </>
  );
};

export default SingleProjectPage;
