"use client";

import { useRecoilState } from "recoil";
import { Discover_ } from "../components/Discover_";
import {
  InterState,
  ShowingState,
  SignalState,
  UserState,
  TestState,
  IndexState,
} from "../components/atoms/atoms";
import Play_ from "../components/Play_";
import { BG_ } from "../components/Hero_";
import { Tag_ } from "../page";
import LinePlot from "../components/Plot";
import { curriculum_ } from "../components/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getTests } from "@/firebase";
import Overlay_ from "../components/Overlay_";

export default function Home() {
  const [showing_, setShowing_] = useRecoilState(ShowingState);
  const [inter_, setInter_] = useRecoilState(InterState);
  const [signal_, setSignal_] = useRecoilState(SignalState);
  const listNames = Object.keys(curriculum_);
  return (
    <div
      className={`w-full h-[100vh] flex flex-row justify-center items-center relative overflow-hidden`}
    >
      <BG_ />
      <Profile_ />
      <Overlay_/>
      {/* <Tag_ initials="Sho!" /> */}
    </div>
  );
}

interface Profile_Props {}

const Profile_ = ({}: Profile_Props) => {
  const [user_, setUser_] = useRecoilState(UserState);
  const [data, setData] = useState<any>([]);
  const [index_, setIndex_] = useRecoilState(IndexState);
  const [test_, setTest_] = useRecoilState(TestState);
  const dataMap_ = async () => {
    const x = getTests();
    setData(await x);
  };
  useEffect(() => {
    dataMap_();
  }, []);
  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-start items-center absolute mix-blend-overlay`}
    >
      <div
        className={`w-full h-[90vh] flex flex-col justify-center items-center relative overflow-hidden`}
      >
        <img
          className={`w-full object-cover relative top-[150px]`}
          src={`/assets/images/tree.jpg`}
        />
        <img src={`/public/assets/blob.svg`} className={``} />
      </div>
      <div
        className={`w-full min-h-screen flex flex-row justify-center items-center relative`}
      >
        <div
          className={`w-full h-screen bg-white flex flex-col justify-start items-center`}
        >
          <div
            className={`w-[230px] h-[230px] bg-black/10 rounded-[50%] flex flex-col justify-center items-center relative bottom-[130px] right-[400px]`}
          >
            <div
              className={`w-[210px] h-[210px] bg-black/80 rounded-[50%] flex flex-col justify-start items-center relative overflow-hidden`}
            >
              <img
                src={user_?.dp}
                className={`w-full h-full object-cover rotate-[0deg] hover:rotate-[3deg] hover:scale-[1.05] hover:duration-200 duration-500 transition-all cursor-pointer`}
              />
            </div>
          </div>
          <div
            className={`w-[1100px] min-h-2 mx-auto grid grid-cols-3 gap-0 gap-x-3 mt-4 space-y-0`}
          >
            {data.slice(-3).map((obj_: any, index: any) => {
              return <Result_ key={index} data={obj_} idx={index} />;
            })}
          </div>
        </div>
        <div
          className={`absolute flex flex-row justify-center items-center pt-10 top-0`}
        >
          {/* <LinePlot
            data={[
              {
                fee: 163,
                category: "Risk Management and Accident Prevention",
                r: 40,
              },
              { fee: 178, category: "Legal and Ethical Aspects", r: 80 },
              {
                fee: 92,
                category: "Insurance Terminology and Policy Documentation",
                r: 30,
              },
              { fee: 101, category: "Claims Process and Procedures", r: 70 },
              { fee: 47, category: "Emergency Preparedness", r: 10 },
              { fee: 134, category: "Financial Planning and Budgeting", r: 90 },
              {
                fee: 63,
                category: "Insurance Industry Trends and Innovations",
                r: 60,
              },
              { fee: 115, category: "Comparing Insurance Providers", r: 50 },
              {
                fee: 88,
                category: "Customer Service and Communication Skills",
                r: 20,
              },
            ]}
          /> */}

          <div
            className={`min-w-0 min-h-0 flex flex-col justify-center items-center absolute top-[-30px]`}
            onClick={() => {
              // console.log()
            }}
          >
            <p
              className={`_squada text-[50px] text-[#333333]/90 transition-all duration-500 tracking-tighter`}
            >
              {user_?.displayName}
            </p>
            <p
              className={`_inter text-[15px] font-light text-[#333333]/50 transition-all duration-500 tracking-tighter relative bottom-[20px]`}
            >
              {user_?.email}
            </p>
          </div>

          <img
            className={`w-[150px] object-cover relative bottom-10 hover:scale-[0.9] ${test_ == 0 && 'scale-[0.9] animate-pulse'} opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
            src={`/assets/images/badges/swamp.png`}
            onClick={() => {
              test_ == 0 ? setTest_(-1) : setTest_(0)
            }}
          />
          <img
            className={`w-[200px] object-cover hover:scale-[0.9] ${test_ == 1 && 'scale-[0.9] animate-pulse'} opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
            src={`/assets/images/badges/space.png`}
            onClick={() => {
              test_ == 1 ? setTest_(-1) : setTest_(1)
            }}
          />
          <img
            className={`w-[150px] object-cover relative bottom-10 hover:scale-[0.9] ${test_ == 2 && 'scale-[0.9] animate-pulse'} opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
            src={`/assets/images/badges/ice.png`}
            onClick={() => {
              test_ == 2 ? setTest_(-1) : setTest_(2)
            }}
          />
        </div>
      </div>
    </div>
  );
};

interface Result_Props {
  data: any;
  idx: number;
}

const Result_ = ({ data, idx }: Result_Props) => {
  const [test_, setTest_] = useRecoilState(TestState);
  const [index_, setIndex_] = useRecoilState(IndexState);
  return (
    <div
      className={`flex flex-col justify-start items-center ${
        test_ == idx
          ? "opacity-100 h-[180px] duration-100"
          : "opacity-80 h-[80px] duration-500"
      } transition-all relative mx-2`}
    >
      <div
        className={`min-w-2 min-h-2 invert hover:invert-0 bg-[ghostwhite] hover:bg-[ghostwhite] transition-all duration-200 shadow-md flex flex-row justify-center items-center rounded-[4px] py-1 px-2 cursor-pointer z-[2]`}
        onClick={() => {
          if (idx == test_) {
            setTest_(-1);
          } else {
            setTest_(idx);
          }
        }}
      >
        <div
          className={`flex flex-col justify-center items-start w-[80px] min-h-2`}
        >
          <p
            className={`_squada text-[30px] text-[#333333] transition-all duration-500 tracking-tighter`}
          >
            {data.r.toFixed(2)}%
          </p>
        </div>
        <div
          className={`flex flex-col justify-center items-start w-[250px] min-h-2 ml-4`}
        >
          <p className={`_inter text-[14px] font-black text-black/70 h-[40px]`}>
            {data.t}
          </p>
          <p className={`_inter text-[12px] font-thin text-black/50 relative`}>
            30, July 2023
          </p>
        </div>
      </div>
      <div
        className={`my-2 flex flex-col justify-center items-start w-[300px] min-h-[90px] cursor-pointer relative ${
          test_ == idx
            ? "opacity-100 duration-[300ms] bottom-[0px]"
            : "opacity-0 duration-75 bottom-[50px]"
        } transition-all ${
          data.q[index_].a == data.q[index_].given
            ? "bg-blue-500/80"
            : "bg-red-500/80"
        } rounded-[4px] py-2 px-3 ${
          data.q[index_].a == data.q[index_].given
            ? "text-black/90"
            : "text-white/90"
        } z-0`}
        onClick={() => {
          if (index_ < 2) {
            setIndex_(index_ + 1);
          } else {
            setIndex_(0);
          }
        }}
      >
        <p className={`text-[12px] font-semibold tesxt-white`}>
          {data.q[index_].q}
        </p>
        <div
          className={`w-full h-[1px] ${
            data.q[index_].a == data.q[index_].given
              ? "bg-black/30"
              : "bg-white/30"
          } my-[2px]`}
        />
        <p className={`text-[10px]`}>{data.q[index_].a}</p>
        <p className={`text-[10px]`}>{data.q[index_].given}</p>
      </div>
    </div>
  );
};
