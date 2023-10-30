import { useContext, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/UI/header/header";
import SingleProject from "../components/projects/single-project/single-project";
import { UserContext } from "../store/user/user-context";
import styles from "./styles/single-project-page.module.css";
import ManageDate from "../components/projects/single-project/manage-date";

const SingleProjectPage = () => {
  const [daysShowingPointer, setDaysShowingPointer] = useState(0);
  const [yearsPointer, setYearsPointer] = useState(0);

  const currProjRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const userCTX = useContext(UserContext).user;
  const projectNames = Object.keys(userCTX.projects);
  const { projectName } = useParams();

  const projSelectChangeHandler = () => {
    const newProjName =
      currProjRef.current && currProjRef.current.value
        ? currProjRef.current.value
        : projectName;
    navigate(`/projects/${newProjName}`);
  };

  //date managing
  let existingYears: string[] = [];
  if (
    typeof projectName === "string" &&
    userCTX.projects[projectName] &&
    userCTX.projects[projectName].viewDates
  ) {
    existingYears = Object.keys({ ...userCTX.projects[projectName].viewDates });
  }
  const years = [new Date().getFullYear() + ""].concat(existingYears);
  const daysShowing = [7, 30, 90, 365];

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
        <ManageDate
          daysShowingPointer={daysShowingPointer}
          yearsPointer={yearsPointer}
          setDaysShowingPointer={setDaysShowingPointer}
          setYearsPointer={setYearsPointer}
          daysShowing={daysShowing}
          years={years}
        />
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
