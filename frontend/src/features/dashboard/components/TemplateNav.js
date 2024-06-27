import React from "react";

const TemplateNav = () => {
  return (
    <div className="flex justify-center items-center pt-8">
      <button
        type="button"
        className="mr-2 bg-[#d2292e] h-8 w-8 rounded-md flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        <img src="/dashboard/left.svg" alt="Previous Page" />{" "}
      </button>
      <p className="p-3 text-[#d2292e]">1</p>
      <button
        type="button"
        className="ml-2 bg-[#d2292e] h-8 w-8 rounded-md flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      >
        <img src="/dashboard/right.svg" alt="Next Page" />{" "}
      </button>
    </div>
  );
};

export default TemplateNav;
