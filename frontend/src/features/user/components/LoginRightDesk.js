import React from "react";
import Heading from "./Heading";
import LoginForm from "./LoginForm";
import ProtoType from "prop-types";

const LoginRightDesk = ({ rightWidth }) => {
  console.log(rightWidth);
  return (
    <div
      className="bg-white flex flex-col items-center justify-center"
      style={{ width: `${rightWidth}px` }}
    >
      <div>
        <img className="w-[12rem]" src="/login/login_logo.svg" alt="Logo" />
      </div>
      <div className="pt-8">
        <div className=" mt-4">
          <Heading className={"text-3xl  text-black"} text={"Welcome To"} />
          <Heading
            className={"text-3xl  text-red-500 font-bold w-fit"}
            text={"Messaging Dashboard"}
          />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

LoginRightDesk.propTypes = {
  rightWidth: ProtoType.number,
};

export default LoginRightDesk;
