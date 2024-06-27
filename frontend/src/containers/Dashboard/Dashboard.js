import React from "react";
import DashboardInput from "../../features/dashboard/components/DashboardInput";
import TemplateTable from "../../features/dashboard/components/TemplateTable";
import TemplateNav from "../components/TemplateNav";

const Dashboard = () => {
  return (
    <>
      <DashboardInput />
      <TemplateTable />
      <TemplateNav />
    </>
  );
};

export default Dashboard;
