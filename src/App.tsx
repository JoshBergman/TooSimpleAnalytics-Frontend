import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import WorkspacePage from "./pages/workspace-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/projects",
    element: <WorkspacePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <h1>Too Simple Analytics</h1>
      <h2>Working on backend before I start building out the frontend</h2>
    </>
  );
}

export default App;
