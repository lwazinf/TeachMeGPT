"use client";

import Card_ from "./components/Card_";
import { useRecoilState } from "recoil";
import { DataState, ObjectState, data_ } from "./components/atoms/atoms";
import Nav_ from "./components/Nav_";

export default function Home() {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [dataState_, setDataState_] = useRecoilState(DataState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      
      <div
        className={`w-full h-[60px] flex flex-row justify-end items-center px-4 fixed top-0 cursor-pointer`}
      >
        <div
          className={`min-w-[60px] px-2 pt-2 h-full flex flex-col justify-center items-center`}
          onClick={() => {}}
        >
          <img className={`w-[50px]`} src={`/assets/MetaMask.svg`} />
          <p className={`text-[10px] text-black/50`}>MetaMask</p>
        </div>
      </div>
    </main>
  );
}
