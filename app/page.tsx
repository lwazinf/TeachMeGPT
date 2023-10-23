"use client";

import { useRecoilState } from "recoil";
import { DataState, ObjectState } from "./components/atoms/atoms";
import Hero_ from "./components/Hero_";
import Feature_ from "./components/Feature_";
import Footer_ from "./components/Footer_";

export default function Home() {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [dataState_, setDataState_] = useRecoilState(DataState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Hero_ />
      <Feature_ />
      <Footer_ />
      <Tag_ initials="Sho!" />
    </main>
  );
}

interface Tag_Props {
  initials: string;
}

const Tag_ = ({ initials }: Tag_Props) => {
  return (
    <a href={`#top`}>
      <div
        className={`min-w-0 min-h-screen fixed left-0 top-0 flex flex-col justify-start items-center pt-20`}
      >
        <div
          className={`min-w-[50px] h-[120px] bg-red-600 justify-end items-center flex flex-col text-white cursor-pointer`}
        >
          <p className={`text-[19px] font-black pointer-events-none`}>
            {initials}
          </p>
        </div>
      </div>
    </a>
  );
};