import React from "react";

const DashboardInput = () => {
  return (
    <div className="flex">
      <input
        placeholder="Seach Template"
        className="p-2 bg-[#F5F6FA] rounded-xl w-1/2 border border-solid border-gray-800"
      />{" "}
      <button className="relative translate-x-[-2.4rem] bg-[#d2292e] rounded-xl">
        <img src="/dashboard/search.svg" alt="search" height={"20px"}/>
      </button>
    </div>
  );
};

export default DashboardInput;
