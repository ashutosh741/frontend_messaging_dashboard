// All components mapping with path for internal routes
import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const CreateTemplate = lazy(() =>
  import("../pages/protected/CreateTemplate.js")
);
const EditTemplate = lazy(() =>
  import("../pages/protected/EditTemplate.js")
);
const Leads = lazy(() => import('../pages/protected/Leads'))

const Page404 = lazy(() => import("../pages/protected/404"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/leads',
    component: Leads,
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
    path: "/404",
    component: Page404,
  },
];

export default routes;
