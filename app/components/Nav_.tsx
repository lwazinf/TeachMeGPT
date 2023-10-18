import {
  faAdd,
  faCog,
  faEnvelope,
  faNewspaper,
  faPaperPlane,
  faPowerOff,
  faQrcode,
  faSearch,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilState } from "recoil";
import Router from "next/router";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {

  return (
    <div className={`fixed left-4 flex min-h-screen justify-center items-center`}>
      <div
        className={`md:w-[60px] min-w-0 md:h-[350px] h-[60px] rounded-lg shadow-sm bg-white/60 backdrop-blur-md md:flex-col flex-row justify-center items-center flex`}
      >
        {/* <div
        className={`w-[80px] h-[120px] md:relative md:pointer-events-auto absolute pointer-events-none flex flex-row justify-center items-center`}
      ></div> */}
        {/* <div
        className={`w-[80px] h-[1px] flex flex-row justify-center items-center bg-black/0 mb-8 mt-4`}
      /> */}
        {[
          {
            icon: faQrcode,
            action: "navigate to homepage",
            element: "Home",
            alt: "auth",
          },
          {
            icon: faAdd,
            action: "add accom modal",
            element: "Create",
            alt: "auth",
          },
          {
            icon: faPaperPlane,
            action: "popup filters",
            element: "Requests",
            alt: "auth",
          },
          {
            icon: faCog,
            action: "settings",
            element: "Settings",
            alt: "auth",
          },
          {
            icon: faUser,
            action: "authentication",
            element: "Auth",
            alt: "auth",
          },
        ].map((obj) => {
          return (
            <div
              className={`w-[80px] h-[60px] flex flex-row justify-center items-center my-[1px]`}
              key={obj.action}
            >
              <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200`}
                onMouseEnter={() => {
                  
                }}
                onMouseLeave={() => {
                  
                }}
                onClick={async () => {
                  
                }}
              >
                <FontAwesomeIcon
                  icon={obj.icon}
                  className={`w-[20px] h-[20px]`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nav_;
