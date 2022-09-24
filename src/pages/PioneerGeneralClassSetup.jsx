import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { getDefaultClasses } from "../features/classSlice";
import { reset, regClass } from "../features/classSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import { Navbar, ThemeSettings } from "../components";
import { Button } from "../components";
import { DashboardFractionPioneer } from "../Dashboard";

const PioneerGeneralClassSetup = () => {
  // my contexts
  // my contexts
  const {
    activeMenu,
    currentColor,
    setCurrentColor,
    themeSettings,
    setThemeSettings,
    currentMode,
    setCurrentMode,
    preClass,
    setPreClass,
  } = useStateContext();

  // initialize my states
  // initialize my states
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, message, newClass } = useSelector(
    (state) => state.class
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/pioneerschool");
    }
    dispatch(reset());
  }, [dispatch, reset, navigate, isSuccess, isError, isLoading, message]);
  // get default classes
  // get default classes
  const [classData, setClassData] = useState([]);
  useEffect(() => {
    const defaultClasses = JSON.parse(localStorage.getItem("defaultclasses"));
    setClassData(
      defaultClasses.filter((data) => data.className.match(preClass))
    );
    defaultClasses || dispatch(getDefaultClasses());
  }, []);
  //   console.log(classData);
  return (
    <div
      className={currentMode === "Dark" ? "dark" : ""}
      style={{ height: "max-content", minHeight: "100vh" }}
    >
      <div
        className="flex min-h-screen h-fit  bg-neutral-700 relative  dark:bg-main-dark-bg"
        // style={{ height: "150vh" }}
      >
        <DashboardFractionPioneer
          activeMenu={activeMenu}
          onClick={() => setThemeSettings(true)}
        />
        {themeSettings && <ThemeSettings />}
        <div
          className={`dark:bg-main-dark-bg bg-main-bg w-full min-h-screen h-fit ${
            activeMenu ? "md:ml-0" : "flex-2"
          }`}
        >
          <div className="fixed md:static inline-block bg-main-dark dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div
            className="md:w-800 md:mt-7 sm:mt-7 sm:w-760 lg:w-full relative flex justify-around flex-wrap content-around"
            style={{ minHeight: "70vh" }}
          >
            {classData.map((data, index) => (
              <div
                className="h-fit pt-7 w-1/4 bg-white rounded-xl dark:bg-gray-50 ml-5 shadow-xl"
                key={index}
                style={{ minHeight: "10rem" }}
              >
                <div className="w-full flex justify-around h-3/5 items-center">
                  <SiGoogleclassroom className="hover:drop-shadow-xl text-2xl h-9 w-fit p-2 rounded-md bg-black dark:bg-black text-white" />
                  <p style={{ fontFamily: "cursive" }}>{data.className}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PioneerGeneralClassSetup;
