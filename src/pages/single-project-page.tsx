import { useParams } from "react-router-dom";

const SingleProject = () => {
  const { projectName } = useParams();
  return <div>Single project: {projectName}</div>;
};

export default SingleProject;
