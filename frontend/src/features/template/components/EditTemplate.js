import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { updateTemplate } from "../templateSlice";

import ErrorText from "../../../components/Typography/ErrorText";
import { useNavigate, useParams } from "react-router-dom";
import { openModal } from "../../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../../utils/globalConstantUtil";
import { API } from "../../../utils/constants";
import axios from "axios";

const EditTemplate = () => {
  // const { templates } = useSelector((state) => state.template);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [templateObj, setTemplateObj] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const baseURL = `${API}/FetchAllTemplate/ViewTemplates/${id}`;
      try {
        const response = await axios.get(baseURL, config);
        if (response.status === 200) {
          setTemplateObj(response.data.data.template);
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
      // dispatch(sliceLeadDeleted(false));
    };

    fetchData();
  }, []);

  //   console.log("tmeplate ibj", templateObj);
  const deleteCurrentTemplate = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this template?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TEMPLATE_DELETE,
          index,
          navigateTo: "/app/dashboard",
        },
      })
    );
  };
  const handleUpdateTemplate = async () => {
    if (templateObj?.TemplateId.trim() === "")
      return setErrorMessage("Id is required!");
    else if (templateObj?.Content.trim() === "")
      return setErrorMessage("Content is required!");
    try {
      let updatedTemplateObj = {
        TemplateId: templateObj.TemplateId.trim(),
        Content: templateObj.Content.trim(),
        Status: 1,
      };
      const token = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${API}/UpdateTemplate/Update/${id}`,
        updatedTemplateObj,
        config
      );
      if (response?.status === 200) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        // dispatch(sliceLeadDeleted(true));
        dispatch(
          showNotification({ message: response.data.message, status: 1 })
        );
        navigate("/app/dashboard");
      } else {
        dispatch(
          showNotification({
            message: response.data.message,
            status: 0,
          })
        );
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

  const updateFormValue = ({ type, value }) => {
    setErrorMessage("");
    setTemplateObj({ ...templateObj, [type]: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-6 rounded-xl gap-4">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <label className="font-semibold ">
              Template ID<span className="text-red-500  text-xl my-4">*</span>
            </label>
            <input
              type="text"
              className="input  input-bordered w-full max-w-xs placeholder:text-sm bg-inherit"
              placeholder="Enter Template Id"
              value={templateObj?.TemplateId}
              onChange={(e) =>
                updateFormValue({ type: "TemplateId", value: e.target.value })
              }
            />
          </div>

          <button
            className="left-0 bg-[#D2292E] rounded-xl text-white h-[2.5rem] w-[9.5rem]"
            onClick={() => deleteCurrentTemplate(id)}
          >
            Delete Template
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Content<span className="text-red-500   text-xl my-4">*</span>
          </label>
          <textarea
            rows="4"
            cols="100"
            value={templateObj?.Content}
            onChange={(e) =>
              updateFormValue({ type: "Content", value: e.target.value })
            }
            maxLength={50}
            className="textarea  input-bordered w-full bg-inherit "
            placeholder="Enter SMS Content"
          />
        </div>
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
        <div className="flex gap-5 items-center">
          <button
            className="left-0 bg-[#D2292E] rounded-xl text-white h-[2.5rem] w-[9rem]"
            onClick={() => handleUpdateTemplate()}
          >
            Update
          </button>
          <button
            className="left-0 text-[#D2292E] rounded-xl border border-current h-[2.5rem] w-[9rem]"
            onClick={() => navigate("/app/dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
