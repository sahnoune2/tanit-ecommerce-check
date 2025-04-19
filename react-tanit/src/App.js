import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Header } from "./component/Header";
import { Footer } from "./component/Footer";
import { Hero } from "./component/Hero";
import { Signup } from "./component/Signup";
import { Login } from "./component/Login";
import { ToastContainer } from "react-toastify";
import { Code } from "./component/Code";
import { getCurrent, getJobs } from "./Api";
import { CompanyDashboard } from "./component/company/CompanyDashboard";
import { CompanyProfile } from "./component/company/CompanyProfile";
import { UserDashboard } from "./component/users/UserDashboard";
import { UserProfile } from "./component/users/UserProfile";
import { AddProject } from "./component/company/AddProject";
import { Offers } from "./component/Offers";
import { AppliedJobs } from "./component/users/AppliedJobs";
import { Cv } from "./component/company/Cv";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header /> <Outlet /> <Footer className="mt-[100vh]" />
          <ToastContainer position="top-right" />
        </>
      ),
      loader: getCurrent,
      children: [
        { path: "/", element: <Hero /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login />, loader: getCurrent },
        { path: "/code", element: <Code /> },
        {
          path: "/offers",
          element: <Offers />,
          loader: async () => {
            const jobsData = await getJobs();

            const currentUserData = await getCurrent();
            return { jobs: jobsData, connectedUser: currentUserData };
          },
        },
        {
          path: "/Cdashboard",
          element: <CompanyDashboard />,
          children: [
            {
              index: "/Cdashboard",
              element: <CompanyProfile />,
              loader: getCurrent,
            },
            {
              path: "/Cdashboard/addproject",
              element: <AddProject />,
              loader: async () => {
                const allJobs = await getJobs();
                const getCur = await getCurrent();
                return { jobs: allJobs, connectedUser: getCur };
              },
            },
            { path: "/Cdashboard/cv/:candidateID", element: <Cv /> },
          ],
        },
        {
          path: "/Udashboard",
          element: <UserDashboard />,
          children: [
            {
              index: "/Udashboard",
              element: <UserProfile />,
              loader: getCurrent,
            },
            {
              path: "/Udashboard/appliedjobs",
              element: <AppliedJobs />,
              loader: getCurrent,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
