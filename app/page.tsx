"use client";

import Image from "next/image";
import Card_ from "./components/Card_";
import { useRecoilState } from "recoil";
import { ObjectState, data_ } from "./components/atoms/atoms";

export default function Home() {
  const [object_, setObject_] = useRecoilState(ObjectState);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div
        className={`flex flex-col justify-center items-center min-w-[910px] min-h-screen`}
      >
        <div
          className={`gap-4 justify-center items-center columns-2 min-w-[910px] min-h-2 py-8`}
        >
          {data_.map((obj_, index) => {
            return <Card_ section_={obj_} key={index} />;
          })}
        </div>
      </div>
    </main>
  );
}
