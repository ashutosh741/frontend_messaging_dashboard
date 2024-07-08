// All components mapping with path for internal routes
import { lazy } from "react";
import { UserData } from "../utils/constants.js";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const EditUser = lazy(() => import("../pages/protected/EditUser"));

const AddUser = lazy(() => import("../pages/protected/AddUser"));
const ViewUsers = lazy(() => import("../pages/protected/ViewUsers"));
const ProfileSettings = lazy(() => import("../pages/protected/ProfileSettings"));


const CreateTemplate = lazy(() =>
  import("../pages/protected/CreateTemplate.js")
);
const EditTemplate = lazy(() => import("../pages/protected/EditTemplate.js"));

const Page404 = lazy(() => import("../pages/protected/404"));

let user = UserData()

const routes = [
  // {
  //   path: "/welcome",
  //   component: Welcome,
  // },

  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/404",
    component: Page404,
  },
];

if (user?.IsActive && user?.RoleName === "superadmin") {
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
    {
      path: "/editUser/:UserName",
      component: EditUser,
    },
  );
} else if (user?.IsActive && user?.RoleName === "admin") {
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
if (user?.IsActive && user?.RoleName === "user") {
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
