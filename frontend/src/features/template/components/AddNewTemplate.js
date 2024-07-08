import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { addNewTemplate } from "../templateSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import { useNavigate } from "react-router-dom";
import { API, UserData } from "../../../utils/constants";
const AddNewTemplate = () => {
  const user = UserData();
  const INITIAL_TEMPLATE_OBJ = {
    TemplateId: "",
    Content: "",
  };
  const TOKEN = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [templateObj, setTemplateObj] = useState(INITIAL_TEMPLATE_OBJ);

  const saveNewTemplate = async (e) => {
    e.preventDefault();

    if (templateObj.TemplateId.trim() === "")
      return setErrorMessage("Template Id is required!");
    else if (templateObj.Content.trim() === "")
      return setErrorMessage("Content is required!");
    else {
      let newTemplateObj = {
        TemplateId: templateObj.TemplateId.trim(),
        Content: templateObj.Content.trim(),
        CreatedBy: user?.FirstName,
        Status: 0,
        RoleName: user?.RoleName,
      };
      try {
        const tokenResponse = localStorage.getItem("accessToken");
        const tokenData = JSON.parse(tokenResponse);
        const token = tokenData.token;
        // Set the Authorization header with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${API}/createTemplate/newTemplate`,
          newTemplateObj,
          config
        );
        if (response.status === 200) {
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
        if (error.response.status === 409) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          dispatch(
            showNotification({
              message: error.data.message,
              status: 0,
            })
          );
        }
      }

      // dispatch(addNewTemplate({ newTemplateObj }));
    }
  };

  const updateFormValue = ({ type, value }) => {
    setErrorMessage("");
    setTemplateObj({ ...templateObj, [type]: value });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-6 rounded-xl gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold ">
            Template ID<span className="text-red-500  text-xl my-4">*</span>
          </label>
          <input
            type="text"
            className="input  input-bordered w-full max-w-xs placeholder:text-sm bg-inherit"
            placeholder="Enter Template Id"
            onChange={(e) =>
              updateFormValue({ type: "TemplateId", value: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">
            Content<span className="text-red-500   text-xl my-4">*</span>
          </label>
          <textarea
            rows="4"
            cols="100"
            onChange={(e) =>
              updateFormValue({ type: "Content", value: e.target.value })
            }
            maxLength={50}
            className="textarea  input-bordered w-full bg-inherit "
            placeholder="Enter SMS Content"
          />
        </div>
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

        <button
          className="left-0 bg-[#D2292E] rounded-xl text-white h-[2.5rem] w-[9rem]"
          onClick={() => saveNewTemplate()}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddNewTemplate;
