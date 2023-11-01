import { Link } from "react-router-dom";

import Header from "../components/UI/header/header";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div>
        Landing Page
        <Link to="/">Landing Page {"/"} ||| </Link>
        <Link to="/projects">Projects Page {"/projects"} ||| </Link>
        <Link to="/error">Error Page {"/anynon-link"} ||| </Link>
        <Link to="/account">Account Page {"/account"} ||| </Link>
      </div>
    </>
  );
};

export default LandingPage;
