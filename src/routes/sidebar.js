/** Icons are imported separatly to reduce build time */

import BuildingOffice2Icon from "@heroicons/react/24/outline/BuildingOffice2Icon";
import CurrencyRupeeIcon from "@heroicons/react/24/outline/CurrencyRupeeIcon";

import ReportSummaryIcon from "../assets/svgs/ReportSummaryIcon";
import DashboardIcon from "../assets/svgs/DashboardIcon";
const iconClasses = `h-6 w-6`;
// const submenuIconClasses = `h-5 w-5`;

const routes = [
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
];

export default routes;
