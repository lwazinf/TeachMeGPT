"use client";

import { useRecoilState } from "recoil";
import MainCard_ from "../components/Card_";
import { DataState, ObjectState, data_ } from "../components/atoms/atoms";

export default function Home() {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [dataState_, setDataState_] = useRecoilState(DataState);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div
        className={`flex flex-col justify-center items-center min-w-[910px] min-h-screen`}
      >
        <div className="flex flex-wrap justify-center items-center gap-4">
          {data_.map((obj_, index) => {
            return <MainCard_ section_={obj_} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
