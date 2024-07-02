import React, { useState } from "react";
import ErrorText from "./Typography/ErrorText";
import InputText from "./Input/InputText";
import { API, tempUser } from "../../../utils/constants";
import axios from 'axios'

const LoginForm = () => {
  const INITIAL_LOGIN_OBJ = {
    UserName: "",
    Password: "",
  };
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (loginObj.UserName.trim() === "" || loginObj.Password.trim() === "") {
      setErrorMessage("Please enter UserName and password");
      return;
    }
    //  else if (loginObj.password.trim().length < 6) {
    //   setErrorMessage("Password must be at least 6 characters long");
    //   return;
    // } 
    else {
      try {
        // console.log("loginobj is", loginObj)
        const response = await axios.post(`${API}/auth/login`, loginObj);
        console.log("resopinse is",response)
        if (response.status === 200) {
          const user = response.data.user;
          // console.log("response is ", response);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          window.location.href = "/app/dashboard";  
        } else {
          setErrorMessage(response.message);
          // localStorage.setItem("user", JSON.stringify(tempUser));
          // localStorage.setItem("accessToken", "sdjfvklcm");

          // window.location.href = "/app/dashboard";  

        }
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.log("error is ", error.response.data.message)
        // localStorage.setItem("user", JSON.stringify(tempUser));
        // localStorage.setItem("accessToken", "sdjfvklcm");
        // window.location.href = "/app/dashboard"; 
      }
    }

  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="pt-4 xl:w-[32rem]">
        <div className="mb-4">
          <InputText
            type="text"
            defaultValue={loginObj.UserName}
            updateType="UserName"
            containerStyle="mt-4"
            labelTitle="User Name"
            updateFormValue={updateFormValue}
            placeholder={"Enter User Name"}
          />
          <InputText
            type={"password"}
            updateType="Password"
            defaultValue={loginObj.Password}
            containerStyle="mt-4"
            labelTitle="Password"
            updateFormValue={updateFormValue}
            placeholder={"Enter Password"}
          />
          <div className="flex gap-3 left-0 my-4">
            <input type="checkbox" id="rememberMe" className="" />
            <label htmlFor="rememberMe" className="text-black">
              Remember me
            </label>
          </div>
        </div>
        <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
        <button
          type="submit"
          className={
            "btn hover:bg-[#C12429]  bg-[#D2292E] text-white h-14 rounded-lg text-xl w-full mt-4"
          }
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
