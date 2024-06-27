import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import { addNewTemplate } from "../templateSlice";
import ErrorText from "../../../components/Typography/ErrorText";
import { useNavigate } from "react-router-dom";
const AddNewTemplate = () => {
  const INITIAL_TEMPLATE_OBJ = {
    templateId: "",
    content: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [templateObj, setTemplateObj] = useState(INITIAL_TEMPLATE_OBJ);



    const saveNewTemplate = () => {
      console.log("template obj is", templateObj);
      if (templateObj.templateId.trim() === "")
        return setErrorMessage("Id is required!");
      else if (templateObj.content.trim() === "")
        return setErrorMessage("Content is required!");
      else {
        let newTemplateObj = {
          templateId: templateObj.templateId.trim(),
          content: templateObj.content.trim(),
          status: "PENDING",
        };
        dispatch(addNewTemplate({ newTemplateObj }));
        dispatch(showNotification({ message: "New Template Added!", status: 1 }));
        navigate('/app/dashboard')
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
              updateFormValue({ type: "templateId", value: e.target.value })
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
              updateFormValue({ type: "content", value: e.target.value })
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
