import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UserContext } from "../store/user/user-context";
import Header from "../components/UI/header/header";
import SingleProject from "../components/projects/single-project/single-project";
import ManageDate from "../components/projects/single-project/single-project-components/manage-date";
import ConnectProjectModal from "../components/projects/single-project/single-project-components/connect-project-modal";
import styles from "./styles/single-project-page.module.css";
import DeleteProjectButton from "../components/projects/single-project/single-project-components/delete-project-button";

const SingleProjectPage = () => {
  const [daysShowingPointer, setDaysShowingPointer] = useState(0);
  const [yearsPointer, setYearsPointer] = useState(0);
  const [showingAddView, setShowingAddView] = useState(false);

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

  //moves user to relevant project page upon refresh/initial laod-in
  useEffect(() => {
    setTimeout(() => {
      if (currProjRef.current) {
        if (typeof projectName === "string") {
          currProjRef.current.value = projectName;
        }
      }
    }, 650);
    navigate(`/projects/${projectName}`);
  }, [navigate, projectName]);

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
  const daysShowing = [7, 30, 90, 365]; //options to view length of graph

  //brings up the menu for implementing analytics to your project
  const toggleShowingAddView = () => {
    setShowingAddView((prevAddView) => !prevAddView);
  };

  return (
    <>
      <Header />
      {showingAddView && (
        <ConnectProjectModal
          toggleShowing={toggleShowingAddView}
          projName={projectName + ""}
        />
      )}
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
              <option className={styles.option} key={projName} id={projName}>
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
          days={daysShowing[daysShowingPointer]}
          year={years[yearsPointer]}
        />
      ) : (
        <SingleProject
          projectName="Loading"
          projectInfo={{ totalViews: 0 }}
          days={0}
          year={"0"}
        />
      )}
      <div className={styles.bottomContainer}>
        <button className="actionButton" onClick={toggleShowingAddView}>
          Connect Project
        </button>
        <DeleteProjectButton projectName={projectName} />
      </div>
    </>
  );
};

export default SingleProjectPage;
