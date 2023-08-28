"use client";

import {
  faAd,
  faAdd,
  faArrowRight,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTextareaAutosize from "react-textarea-autosize";

interface Card_Props {
  type_: string;
}

const Card_ = ({ type_ }: Card_Props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-[450px] min-h-[200px] bg-white shadow-md rounded-[8px] relative overflow-hidden m-2`}
    >
      <div
        className={`flex flex-col justify-start items-start w-full min-h-[100px] p-4 pt-6 relative`}
      >
        <div
          className={`flex flex-row justify-between items-start w-full min-h-2 px-4 pt-6`}
        >
          <p className={`font-medium text-[17px]`}>Google Sheets</p>
          <FontAwesomeIcon
          icon={faQuestion}
          className={`w-[9px] cursor-pointer hover:text-black text-black/30 transition-all duration-200 px-[6px] rounded-[5px] ml-auto mr-2`}
        />
          <FontAwesomeIcon
            icon={faTimes}
            className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200`}
          />
        </div>
        <div
          className={`flex flex-row justify-between items-start w-full min-h-2 pl-4 pr-[28px] pt-2`}
        >
          <p className={`text-[13px] text-black/50 leading-4`}>
            It appears you already have an account with our vision! Please
            proceed to the option of your choice:
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col justify-start items-start w-full min-h-[50px] px-4 pt-1`}
      >
        {type_ == "multichoice"
          ? [1, 2, 3].map((obj_, index) => {
              return (
                <div
                  className={`flex flex-row justify-between items-center w-full h-[60px] px-4 bg-black/5 rounded-md mb-3 hover:bg-black/20 hover:px-5 cursor-pointer transition-all duration-500 hover:duration-0`}
                  key={index}
                >
                  <p className={`text-[13px] text-black/50`}>Google Sheets</p>
                  <FontAwesomeIcon
                    icon={obj_ !== 3 ? faArrowRight : faAdd}
                    className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200`}
                  />
                </div>
              );
            })
          : type_ == "detail" &&
            [1].map((obj_, index) => {
              return (
                <div
                  className={`flex flex-col justify-between items-center w-full min-h-[60px] px-4 bg-black/5 rounded-md mb-3 hover:bg-black/20 transition-all duration-500 hover:duration-0 relative`}
                  key={index}
                >
                  <ReactTextareaAutosize
                    maxRows={5}
                    className={`w-full h-[100%] text-[13px] text-black/50 leading-4 text-left`}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Card_;
