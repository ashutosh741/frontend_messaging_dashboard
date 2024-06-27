import { useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";
import { API } from "../../utils/constants";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "./components/Input/InputText";
import { handleError } from "../../utils/errorUtils";

function AddUser() {
  const INITIAL_USER_OBJ = {
    FirstName: "",
    LastName: "",
    Email: "",
    RoleType: "",
    Password: "",
  };

  const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const submitForm = async (e) => {
    e.preventDefault();
    if (userObj.FirstName.trim() === "") {
      dispatch(
        showNotification({
          message: "First Name is required!",
          status: 0,
        })
      );
      return;
    }
    if (userObj.LastName.trim() === "") {
      dispatch(
        showNotification({
          message: "Last Name is required!",
          status: 0,
        })
      );
      return;
    }
    if (userObj.Email.toString().trim() === "") {
      dispatch(
        showNotification({
          message: "Email is required!",
          status: 0,
        })
      );
      return;
    }
    if (!isEmailValid(userObj.Email)) {
      return dispatch(
        showNotification({
          message: "Email is not Valid!",
          status: 0,
        })
      );
    }

    if (userObj.RoleType === "default") {
      dispatch(
        showNotification({
          message: "Role Type is required.",
          status: 0,
        })
      );
      return;
    }
    if (userObj.Password === "") {
      dispatch(
        showNotification({
          message: "Password is required.",
          status: 0,
        })
      );
      return;
    } else {
        console.log("uesr data is",userObj)
      userObj.FirstName = userObj.FirstName.trim();
      userObj.LastName = userObj.LastName.trim();
      userObj.Email = userObj.Email.trim();
      userObj.RoleType = userObj.RoleType.trim();
      userObj.Password = userObj.Password.trim();

    //   try {
    //     const tokenResponse = localStorage.getItem("accessToken");
    //     const tokenData = JSON.parse(tokenResponse);
    //     const token = tokenData.token;
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };

    //     const response = await axios.post(`${API}/addUser`, userObj, config);

    //     if (response.status === 201) {
    //       setUserObj(INITIAL_USER_OBJ);

    //       dispatch(
    //         showNotification({
    //           message: "User Created Successfully!",
    //           status: 1,
    //         })
    //       );
    //     }
    //   } catch (error) {
    //     handleError(error);
    //     dispatch(
    //       showNotification({
    //         message: `${error.response.data.message}`,
    //         status: 0,
    //       })
    //     );
    //   }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setUserObj({ ...userObj, [updateType]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <TitleCard title="Fill User Details" topMargin="mt-2">
        <form onSubmit={(e) => submitForm(e)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              defaultValue={userObj.FirstName}
              updateType="FirstName"
              containerStyle="mt-4"
              labelTitle="First Name"
              updateFormValue={updateFormValue}
            />

            <InputText
              defaultValue={userObj.LastName}
              updateType="LastName"
              containerStyle="mt-4"
              labelTitle="Last Name"
              updateFormValue={updateFormValue}
            />
            <InputText
              defaultValue={userObj.Email}
              type="email"
              updateType="Email"
              containerStyle="mt-4"
              labelTitle="Email"
              updateFormValue={updateFormValue}
            />

            <div>
              <label className="label mt-4">Role Type</label>
              <select
                name="RoleType"
                updateType="RoleType"
                className="input input-bordered w-full pe-2"
                onChange={handleInputChange}
                value={userObj.RoleType}
              >
                <option value="default" selected disabled>
                  Select Role
                </option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
            </div>
            <div className="relative">
              <InputText
                defaultValue={userObj.Password}
                type={showPassword ? "text" : "password"}
                updateType="Password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
              />
              <button
                className="text-sm absolute right-0 top-[62%] pt-[5px] mr-2"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-primary float-right" type="submit">
              Create
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default AddUser;
