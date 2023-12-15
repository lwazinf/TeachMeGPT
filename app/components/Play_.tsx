'use client'

import { useRecoilState } from "recoil";
import MainCard_ from "../components/Card_";
import { DataState, ObjectState, data_ } from "../components/atoms/atoms";

export default function Play_() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start absolute top-0">
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
