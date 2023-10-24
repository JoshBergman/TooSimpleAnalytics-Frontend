import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/landing-page";
import ProjectsPage from "./pages/projects-page";
import ErrorPage from "./pages/error-page";
import { AppStateContext } from "./store/app-state/app-state-context";
import DevPage from "./pages/dev-page";

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
    path: "/dev",
    element: <DevPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const isDarkMode = useContext(AppStateContext).appState.isDarkMode;

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
