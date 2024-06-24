import React from "react";
import LoginRightDesk from "./components/LoginRightDesk";
import LoginRightMob from "./components/LoginRightMob";

const Login = () => {
  const [rightWidth, setRightWidth] = React.useState(window.innerWidth / 2);

  React.useEffect(() => {
    const handleResize = () => {
      setRightWidth(window.innerWidth - window.innerHeight);

    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex w-full h-screen bg-white overflow-hidden">
      <div className="h-screen hidden xl:block ">
        <img
          src="/login/login_left.svg"
          alt="Login"
          className="contain"
          style={{ height: `${window.innerHeight}px` }}
        ></img>
      </div>
      {window.innerWidth > 1280 ? (
        <LoginRightDesk rightWidth={rightWidth} />
      ) : (
        <LoginRightMob />
      )}
    </div>
  );
};

export default Login;
