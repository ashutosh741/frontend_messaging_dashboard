import React from "react";
import TableHead from "./TableHead";
import TableData from "./TableData";

const Table = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold py-4 text-left">Templates</h2>
        <select name="dog-names" id="dog-names" className="w-16 h-8 rounded-md border pl-2">
          {" "}
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="table-container border rounded-lg">
        <table className="table">
          <thead>
            <tr className="table-head bg-[#b5b5b5]">
              <TableHead />
            </tr>
          </thead>
          <tbody>
            <TableData />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
