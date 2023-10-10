import { useContext } from "react";
import { UserContext } from "../../store/user/user-context";
import { project } from "../../interfaces/user";

const ProjectsDisplay = () => {
  const userCTX = useContext(UserContext).user;
  const projects: { [projectName: string]: project } = userCTX.projects;

  const renderProjects = () => {
    const projElements: React.ReactNode[] = [];
    const projKeys = Object.keys(projects);

    for (let i = 0; i < projKeys.length; i++) {
      const currProjName = projKeys[i];
      projElements.push(<div key={currProjName}>{currProjName}</div>);
    }

    return projElements;
  };

  return <div>{renderProjects()}Make a grid here to display projects</div>;
};

export default ProjectsDisplay;
