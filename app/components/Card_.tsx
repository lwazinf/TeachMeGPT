"use client";

import {
  faAdd,
  faArrowRight,
  faQuestion,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Detail_, MultiChoice_ } from "./utils/AuxUI_";
import { useRecoilState } from "recoil";
import { ObjectState } from "./atoms/atoms";

interface Card_Props {
  section_: any;
}

const Card_ = ({ section_ }: Card_Props) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-[450px] min-h-[200px] bg-white shadow-md rounded-[8px] relative overflow-hidden mb-3`}
    >
      <TitleSection_ obj_={section_}/>
      {section_.media && (
        <div
          className={`flex flex-col justify-center items-start w-[385px] min-h-[200px]`}
        >
          <div
            className={`w-full h-[200px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mb-2 cursor-pointer`}
          />
          <p
            className={` pb-2 w-full text-[13px] text-black/50 leading-4 text-left`}
          >
            Media:
          </p>
          <div
            className={`w-full h-[60px] rounded-sm mb-2 mt-[-4px] flex flex-row justify-start items-center`}
          >
            <div
              className={`w-[60px] h-[60px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mx-[1px] cursor-pointer`}
            />
            <div
              className={`w-[60px] h-[60px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mx-1 cursor-pointer`}
            />
          </div>
        </div>
      )}
      {section_.questions.length > 0 && (
        <div className={`w-[80%] h-[0.5px] bg-black/50 mb-0`} />
      )}
      {section_.questions.map((obj_: any, index: number) => {
        
        return (
          <div
            className={`text-[13px] text-black/30 leading-4 text-left w-full px-8 my-2 flex flex-row`}
            key={index}
          >
            <p className={`w-[70px] pointer-events-none text-black`}>{`${
              index + 1
            } `}</p>
            <p
              className={`hover:text-black/60 cursor-pointer transition-all duration-500 hover:line-through`}
            >{`${obj_}`}</p>
          </div>
        );
      })}
      <div
        className={`w-[80%] h-[0.5px] bg-black/50 ${
          section_.type == "answers" ? "mb-1" : "mb-2"
        }`}
      />
      <div
        className={`flex flex-col justify-start items-start w-full min-h-[50px] px-4 pt-1`}
      >
        {section_.type == "multichoice"
          ? [1, 2, 3].map((obj_, index) => {
              return <MultiChoice_ key={index} obj_={obj_} />;
            })
          : section_.type == "detail" &&
            [1].map((obj_, index) => {
              return <Detail_ key={obj_} />;
            })}
            {
              section_.type == 'multichoice' && <div
              className={`flex flex-row justify-center items-center w-full h-[60px] px-4 bg-black/5 rounded-md mb-3 hover:bg-black/20 hover:px-5 cursor-pointer transition-all duration-500 opacity-50 hover:opacity-100 hover:animate-pulse`}
            >
              {/* <p className={`text-[13px] text-black/50`}>Add More</p> */}
              <FontAwesomeIcon
                icon={faAdd}
                className={`w-[12px] text-black/50 cursor-pointer hover:text-black transition-all duration-200`}
              />
            </div>
            }
      </div>
    </div>
  );
};

export default Card_;

// // // // // // // // // TitleSection_

interface TitleSection_Props {
  obj_ : any
}
 
const TitleSection_ = ({obj_}:TitleSection_Props) => {
  const [object_, setObject_] = useRecoilState(ObjectState)
  return ( 
    <div
        className={`flex flex-col justify-start items-start w-full min-h-[100px] px-4 pb-3 pt-6 relative`}
      >
        <div
          className={`flex flex-row justify-between items-start w-full min-h-2 px-4 pt-6`}
        >
          <p className={`font-medium text-[17px]`}>{obj_.title}</p>
          <FontAwesomeIcon
            icon={faQuestion}
            className={`w-[9px] cursor-pointer hover:text-black text-black/30 transition-all duration-200 px-[6px] rounded-[5px] ml-auto mr-2 mt-1`}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200 mt-1`}
            onClick={() => {
              let temp_ = [obj_.uid] 
              setObject_(temp_)
              console.log(object_)
            }}
          />
        </div>
        <div
          className={`flex flex-row justify-between items-start w-full min-h-2 pl-4 pr-[28px] pt-2`}
        >
          <p className={`text-[13px] text-black/50 leading-4`}>
            {obj_.case}
          </p>
        </div>
      </div>
   );
}

