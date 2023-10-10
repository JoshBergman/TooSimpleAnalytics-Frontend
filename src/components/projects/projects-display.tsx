import { useContext } from "react";
import { UserContext } from "../../store/user/user-context";
import { project } from "../../interfaces/user";

const ProjectsDisplay = () => {
  const userCTX = useContext(UserContext).user;
  console.log(userCTX);
  const projects: { [projectName: string]: project } = userCTX.projects;

  const renderProjects = () => {
    const projElements: React.ReactNode[] = [];
    const projKeys = Object.keys(projects);
    console.log(projKeys);

    for (let i = 0; i < projKeys.length; i++) {
      const currProjName = projKeys[i];
      projElements.push(<div key={currProjName}>{currProjName}</div>);
    }

    console.log(projElements);
    return projElements;
  };

  return (
    <div>
      {renderProjects()}Either a grid or a flexbox displaying all the user
      projects
    </div>
  );
};

export default ProjectsDisplay;
