import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DashboardBtn from "./components/DashboardBtn";
import { themeChange } from "theme-change";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
import { useSelector } from "react-redux";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log("local users is", user)
  const location = useLocation();
  const { pageTitle } = useSelector((state) => state.header);
  console.log("params is", location.pathname);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, [currentTheme]);
  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}

        <div className="">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
        </div>

        <div className="flex gap-5">
          {
            user.RoleName === "user" ? null : (

              location.pathname.includes("createtemplate") ? null : (
                <DashboardBtn
                  text="Create SMS Template"
                  className="bg-[#D2292E] h-[2.5rem] px-4 rounded-lg hidden lg:block text-white"
                  link="/app/createtemplate"
                />
              )

            )
          }


          <div className="order-last flex">
            <label className="swap ">
              <input type="checkbox" />
              <SunIcon
                data-set-theme="light"
                data-act-class="ACTIVECLASS"
                className={
                  "fill-current w-6 h-6 " +
                  (currentTheme === "dark" ? "swap-on" : "swap-off")
                }
              />
              <MoonIcon
                data-set-theme="dark"
                data-act-class="ACTIVECLASS"
                className={
                  "fill-current w-6 h-6 " +
                  (currentTheme === "light" ? "swap-on" : "swap-off")
                }
              />
            </label>

            <div className="dropdown dropdown-end ml-3">
              {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={logo} alt="profile" />
              </div>
            </label> */}
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full flex items-center justify-center bg-[#D2292E]">
                  <span className="text-lg text-white flex items-center justify-center h-full">
                    AM
                  </span>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-[14rem]"
              >
                <li className="justify-between">
                  <Link to={"/app/settings-profile"}>
                    Profile Settings
                    <span className="badge">New</span>
                  </Link>
                  {
                    user.RoleName === "user" ? null : (
                      <Link className="lg:hidden block" to={"/app/createtemplate"}>
                        Create Template
                      </Link>
                    )}
                </li>

                <div className="divider mt-0 mb-0"></div>
                <li>
                  <span onClick={logoutUser}>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
