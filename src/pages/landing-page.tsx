import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <Link to="/">Landing Page {"/"} ||| </Link>
      <Link to="/projects">Projects Page {"/projects"} ||| </Link>
      <Link to="/error">Error Page {"/anynon-link"} ||| </Link>
    </div>
  );
};

export default LandingPage;
