import React from "react";
import Heading from "./Heading";
import LoginForm from "./LoginForm";

const LoginRightMob = () => {
  return (
    <div className="w-full p-8 h-screen flex flex-col justify-center">
      <div className="w-full ml-auto flex justify-center">
        <img src="/login/login_logo.svg" alt="Logo" className="w-3/4"/>
      </div>
      <div className="flex justify-center flex-col">
        <div className="justify-center mt-12">
          <Heading className={"text-2xl  text-black"} text={"Welcome To"} />
          <Heading
            className={"text-2xl  text-red-500 font-bold w-fit"}
            text={"Messaging Dashboard"}
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginRightMob;
