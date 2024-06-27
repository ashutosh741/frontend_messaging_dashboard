/** Icons are imported separatly to reduce build time */

import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";

import ReportSummaryIcon from "../assets/svgs/ReportSummaryIcon";
import DashboardIcon from "../assets/svgs/DashboardIcon";
const iconClasses = `h-6 w-6`;
// const submenuIconClasses = `h-5 w-5`;

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

const routes = [];

if (user?.isActive && user?.role?.includes("SUPERADMIN")) {
  routes.push(
    {
      path: "/app/dashboard",
      // icon: <BuildingOffice2Icon className={iconClasses} />,
      icon: <DashboardIcon className={iconClasses} />,

      name: "Dashboard",
    },
    {
      path: "/app/reportSummary",
      icon: <ReportSummaryIcon className={iconClasses} />,
      // icon: <BuildingOffice2Icon className={iconClasses} />,

      name: "Report Summary",
    },
    {
      path: "/app/addUser",
      icon: <UserCircleIcon className={iconClasses} />,
      // icon: <BuildingOffice2Icon className={iconClasses} />,

      name: "Add User ",
    },
    {
      path: "/app/viewUsers",
      icon: <UserGroupIcon className={iconClasses} />,
      // icon: <BuildingOffice2Icon className={iconClasses} />,

      name: "View Users",
    },

  );
}
else if (user?.isActive && user?.role?.includes("ADMIN")) {
  routes.push(
    {
      path: "/app/dashboard",
      // icon: <BuildingOffice2Icon className={iconClasses} />,
      icon: <DashboardIcon className={iconClasses} />,

      name: "Dashboard",
    },
    {
      path: "/app/reportSummary",
      icon: <ReportSummaryIcon className={iconClasses} />,
      // icon: <BuildingOffice2Icon className={iconClasses} />,

      name: "Report Summary",
    },
  );
}
else if (user?.isActive && user?.role?.includes("SUPERADMIN")) {
  routes.push(
    {
      path: "/app/dashboard",
      // icon: <BuildingOffice2Icon className={iconClasses} />,
      icon: <DashboardIcon className={iconClasses} />,

      name: "Dashboard",
    },
    {
      path: "/app/reportSummary",
      icon: <ReportSummaryIcon className={iconClasses} />,
      // icon: <BuildingOffice2Icon className={iconClasses} />,

      name: "Report Summary",
    },

  );
}
export default routes;
