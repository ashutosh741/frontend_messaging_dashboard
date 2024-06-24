import React, { useState } from "react";
import ErrorText from "./Typography/ErrorText";
import InputText from "./Input/InputText";

const LoginForm = () => {
  const INITIAL_LOGIN_OBJ = {
    username: "",
    password: "",
  };
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (loginObj.username.trim() === "" || loginObj.password.trim() === "") {
      setErrorMessage("Please enter username and password");
      return;
    } else if (loginObj.password.trim().length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    localStorage.setItem("accessToken", "jkahdkfgasdfoasducaxn");
    window.location.href = "/app/dashboard";
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
            defaultValue={loginObj.username}
            updateType="username"
            containerStyle="mt-4"
            labelTitle="User Name"
            updateFormValue={updateFormValue}
            placeholder={"Enter User Name"}
          />
          <InputText
            type={"password"}
            updateType="password"
            defaultValue={loginObj.password}
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
