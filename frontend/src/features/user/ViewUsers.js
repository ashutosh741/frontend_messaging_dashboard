import React, { useEffect, useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/constants";
import axios from "axios";

const ViewUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const baseURL = `${API}/user/users`;
      try {
        const response = await axios.get(baseURL, config);
        if (response.status === 200) {
          console.log("repsonse is", response);
          setUsers(response.data.data.data);
        } else {
          console.log("access token incorrect");
        }
      } catch (error) {
        handleError(error);
        dispatch(
          showNotification({
            message: error.response.data.message,
            status: 0,
          })
        );
      }
    };

    fetchData();
  }, []);

  const deleteCurrentUser = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this User?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.USER_DELETE,
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
  return (
    <>
      <TitleCard
        title="Users List"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Sr.No </th>
                <th>Full Name</th>
                <th>Email</th>
                <th>RoleName</th>
                {/* <th>Description</th> */}

                <th>Created Date</th>
                <th>IsActive</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{k + 1}</td>
                    <td>
                      {l.FirstName} {l.LastName}
                    </td>
                    <td>{l.UserName}</td>
                    <td>{l.RoleName}</td>
                    {/* <td>{l.Description}</td> */}
                    <td>{l.CreatedDate}</td>
                    <td>{l.IsActive}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => navigate(`/app/editUser/${l.UserName}`)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentUser(l.UserName)}
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

export default ViewUsers;
