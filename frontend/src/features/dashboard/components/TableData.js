import React from "react";
// import { tableData } from "../../../utils/constants";
// import { tableData } from "../../../utils/constants";

const TableData = () => {
  // console.log(tableData);
  // const data = tableData;

  const tableData = [
    {
      srNo: 1,
      templateId: "SGMD22052024001",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "Active",
      action: "",
    },
    {
      srNo: 2,
      templateId: "SGMD22052024002",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "Active",
      action: "",
    },
    {
      srNo: 3,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 4,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 5,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 6,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 7,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 8,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    {
      srNo: 9,
      templateId: "SGMD22052024003",
      content:
        "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      status: "In-Active",
      action: "",
    },
    // {
    //   srNo: 10,
    //   templateId: "SGMD22052024003",
    //   content:
    //     "Dear Pax, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    //   status: "In-Active",
    //   action: "",
    // },
  ];

  return (
    <>
      {tableData.map((row) => (
        <tr key={row.srNo} className="bg-white hover:bg-[#d2292f1f]">
          <td className="px-7 border-t h-13">{row.srNo}</td>
          <td className="border-t h-13">
            <a href={`/app/:${row.templateId}`} className="text-[#d2292e]">
              {row.templateId}
            </a>
          </td>
          <td className="py-4 border-t text-left">{row.content}</td>
          <td className="h-13 border-t text-left">{row.status}</td>
          <td className="border-t h-13 text-left flex gap-4 pt-5 px-3">
            <a href="/">
              <img src="/dashboard/edit_icon.svg" alt="edit" />
            </a>
            <a href="/">
              <img src="/dashboard/delete_icon.svg" alt="delete" />
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableData;
