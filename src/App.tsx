import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/landing-page";
import ProjectsPage from "./pages/projects-page";
import ErrorPage from "./pages/error-page";
import Header from "./components/UI/header/header";

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
]);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedColorScheme = localStorage.getItem("theme");
    if (storedColorScheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <Header setIsDarkMode={setIsDarkMode} />
      <RouterProvider router={router} />
      <h1>Too Simple Analytics</h1>
      <h2>Working on backend before I start building out the frontend</h2>
    </div>
  );
}

export default App;
