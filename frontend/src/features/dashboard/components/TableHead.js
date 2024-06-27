import React from "react";

const TableHead = () => {
  const tableHead = ["S. No", "Template Id", "Content", "Status", "Action"];

  return (
    <>
      {tableHead.map((head) => (
        <th className="mx-6 h-12 text-left  text-white font-normal" key={head}>
          {/* bg-[#b5b5b5] */}
          {head}
        </th>
      ))}
    </>
  );
};

export default TableHead;
