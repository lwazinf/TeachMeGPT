"use client";

import { useRecoilState } from "recoil";
import { Discover_ } from "../components/Discover_";
import { ShowingState, UserState } from "../components/atoms/atoms";
import Play_ from "../components/Play_";
import { BG_ } from "../components/Hero_";
import { Tag_ } from "../page";
import LinePlot from "../components/Plot";

export default function Home() {
  const [showing_, setShowing_] = useRecoilState(ShowingState);

  return (
    <div
      className={`w-full min-h-screen flex flex-row justify-center items-center relative overflow-hidden`}
    >
      <BG_ />
      <Profile_ />
      <div className={`flex flex-col justify-center items-center`}>
        <div
          className={`w-full min-h-screen bg-black/20 backdrop-blur-lg absolute top-0 ${
            showing_ == ""
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } transition-all duration-200`}
        />
        {showing_ == "discover" ? (
          <Discover_ />
        ) : showing_ == "play" ? (
          <Play_ />
        ) : (
          <div />
        )}
      </div>
      <Tag_ initials="Sho!" />
    </div>
  );
}

interface Profile_Props {}

const Profile_ = ({}: Profile_Props) => {
  const [user_, setUser_] = useRecoilState(UserState);
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
        <div className={`h-[90vh] w-full flex flex-col justify-end items-center absolute top-0`}>
        <img
          className={`w-[200px] object-cover mix-blend-multiply ml-[800px] mb-[100px] rotate-[-5deg]`}
          src={`/assets/images/car.png`}
        />
        </div>
      </div>
      <div
        className={`w-full min-h-screen flex flex-row justify-center items-center relative`}
      >
        <div
          className={`w-[50%] h-screen bg-white flex flex-col justify-start items-center`}
        >
          <div
            className={`w-[230px] h-[230px] bg-black/10 rounded-[50%] flex flex-col justify-center items-center relative bottom-[130px]`}
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
        </div>
        <div
          className={`w-[50%] h-screen bg-white flex flex-col justify-start items-center`}
        >
          <LinePlot data={[{ fee: 20 }, { fee: 100 }]} />
        </div>
        <div className={`absolute flex flex-row justify-center items-center pt-10 top-0`}>
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
            className={`w-[150px] object-cover relative bottom-10 hover:scale-[0.9] opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
            src={`/assets/images/badges/swamp.png`}
            />
        <img
          className={`w-[200px] object-cover hover:scale-[0.9] opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
          src={`/assets/images/badges/space.png`}
        />
        <img
          className={`w-[150px] object-cover relative bottom-10 hover:scale-[0.9] opacity-90 hover:opacity-100 transition-all duration-200 cursor-pointer`}
          src={`/assets/images/badges/ice.png`}
        />
        </div>
      </div>
    </div>
  );
};
