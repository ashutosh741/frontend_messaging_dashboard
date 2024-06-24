import React from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";

const Template = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { templates } = useSelector((state) => state.template);

  const deleteCurrentTemplate = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this template?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TEMPLATE_DELETE,
          index,
        },
      })
    );
  };
  const TopSideButtons = () => {
    return (
      <div className="inline-block float-right">
        <select className="w-12 h-8 rounded-md text-sm border pl-1 bg-inherit">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    );
  };
  console.log("tempaltes from useseltector is", templates);
  return (
    <>
      <TitleCard
        title="Templates"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sr.No </th>
                <th>Template ID</th>
                <th>Content</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{k + 1}</td>
                    <td>{l.templateId}</td>
                    <td>{l.content}</td>
                    <td>{l.status}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/app/editTemplate/${k}`)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentTemplate(k)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Template;
