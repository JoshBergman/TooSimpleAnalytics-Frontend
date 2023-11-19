import { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/landing-page";
import ProjectsPage from "./pages/projects-page";
import ErrorPage from "./pages/error-page";
import DevPage from "./pages/dev-page";
import SingleProjectPage from "./pages/single-project-page";
import AccountPage from "./pages/account-page";

import { AppStateContext } from "./store/app-state/app-state-context";
import Footer from "./components/UI/footer/footer";
import { addSiteView } from "./add-site-view";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects/:projectName",
    element: <SingleProjectPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dev",
    element: <DevPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const isDarkMode = useContext(AppStateContext).appState.isDarkMode;

  useEffect(() => {
    addSiteView();
  }, []);

  return (
    <div id="app-root" className={isDarkMode ? "dark" : "light"}>
      <div style={{ minHeight: "100vh" }}>
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
