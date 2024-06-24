// import React from "react";
// import DashboardBtn from "./components/DashboardBtn";
import DashboardInput from "./components/DashboardInput";
import TemplateTable from "./components/TemplateTable";
import TemplateNav from "./components/TemplateNav";

function Dashboard ()  {
  return (
    <>
      <DashboardInput />
      <TemplateTable />
      {/* <div className="mb-4 flex items-center">kdfvkjfv</div> */}
      {/* <div className="card w-full p-6 bg-base-100 shadow-xl mt-2">dfbbgfb</div> */}
      <TemplateNav />
    </>
  );
};

export default Dashboard;
