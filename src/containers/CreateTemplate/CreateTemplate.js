import React from "react";
import Header from "../Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
// import PropTypes from 'prop-types'
import { useEffect, useRef } from "react";

const CreateTemplate = (props) => {
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);

  useEffect(() => {
    mainContentRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);
  return (
    <>
      <div className="flex justify-start absolute">
        <Sidebar />
        <Header />
      </div>
      {/* <div className="drawer-content flex flex-col bg-base-200 h-screen">
        <main
          className="flex-1 overflow-y-auto p-8 bg-[#F5F6FA] h-screen"
          ref={mainContentRef}
        >
        </main>
      </div> */}
    </>
  );
};

CreateTemplate.propTypes = {};

export default CreateTemplate;
