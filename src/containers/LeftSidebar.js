import routes from "../routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
// import { useDispatch } from 'react-redux';
// import logo from "../../public/dashboard/sidebar/side_logo.svg";
import { pdfCompanyName } from "../utils/constants";
import SideBarLogo from "../assets/svgs/SideBarLogo";
function LeftSidebar() {
  const location = useLocation();

  // const dispatch = useDispatch()

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  return (
    <div className="drawer-side ">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu  pt-2 w-[8rem] bg-base-100 text-base-content">
        {/* <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button> */}

        <li className="mb-2 font-semibold items-center text-xl">
          <Link to={"/app/dashboard"}>
            {/* <img
              style={{ borderRadius: "10px" }}
              className="rounded-10 w-10"
              src={logo}
              alt={`${pdfCompanyName} Logo`}
            /> */}
            <SideBarLogo />
            {/* {pdfCompanyName} */}
          </Link>{" "}
        </li>
        {routes.map((route, k) => {
          return (
            <li className="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <NavLink
                  end
                  to={route.path}
                  className={({ isActive }) =>
                    `${
                      isActive ? "font-semibold  bg-base-200 " : "font-normal"
                    } flex-col text-center`
                  }
                >
                  {route.icon} {route.name}
                  {location.pathname === route.path ? (
                    <span
                      className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
