import { Link } from "react-router-dom";

import Header from "../components/UI/header/header";
import TheWhat from "../components/landing/the-what";
import SimpleAndFast from "../components/landing/simple-and-fast";
import Privacy from "../components/landing/privacy";
import Tiers from "../components/landing/tiers";

const LandingPage = () => {
  return (
    <>
      <Header />
      <TheWhat />
      <SimpleAndFast />
      <Privacy />
      <Tiers />
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
