// All components mapping with path for internal routes
import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const AddUser = lazy(() => import("../pages/protected/AddUser"));
const ViewUsers = lazy(() => import("../pages/protected/ViewUsers"));

const CreateTemplate = lazy(() =>
  import("../pages/protected/CreateTemplate.js")
);
const EditTemplate = lazy(() => import("../pages/protected/EditTemplate.js"));

const Page404 = lazy(() => import("../pages/protected/404"));

let user;
const userString = localStorage.getItem("user");
if (userString !== null && userString !== undefined) {
  try {
    user = JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    localStorage.clear();
  }
} else {
  localStorage.clear();
}

const routes = [
  // {
  //   path: "/welcome",
  //   component: Welcome,
  // },

  // {
  //   path: "/settings-profile",
  //   component: ProfileSettings,
  // },
  {
    path: "/404",
    component: Page404,
  },
];

if (user?.isActive && user?.role?.includes("SUPERADMIN")) {
  routes.push(
    {
      path: "/dashboard", // the url
      component: Dashboard, // view rendered
    },
    {
      path: "/createtemplate",
      component: CreateTemplate,
    },
    {
      path: "/editTemplate/:id",
      component: EditTemplate,
    },
    {
      path: "/reportSummary",
      component: CreateTemplate,
    },
    {
      path: "/addUser",
      component: AddUser,
    },
    {
      path: "/viewUsers",
      component: ViewUsers,
    },
  );
} else if (user?.isActive && user?.role?.includes("ADMIN")) {
  routes.push(
    {
      path: "/dashboard", // the url
      component: Dashboard, // view rendered
    },
    {
      path: "/createtemplate",
      component: CreateTemplate,
    },
    {
      path: "/editTemplate/:id",
      component: EditTemplate,
    },
    {
      path: "/reportSummary",
      component: CreateTemplate,
    }
  );
}
if (user?.isActive && user?.role?.includes("USER")) {
  routes.push(
    {
      path: "/dashboard", // the url
      component: Dashboard, // view rendered
    },
    {
      path: "/reportSummary",
      component: CreateTemplate,
    }
  );
}

export default routes;
