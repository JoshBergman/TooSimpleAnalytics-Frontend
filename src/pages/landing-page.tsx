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
    </>
  );
};

export default LandingPage;
