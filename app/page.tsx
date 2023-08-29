import Image from "next/image";
import Card_ from "./components/Card_";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div
        className={`flex flex-col justify-center items-center w-full min-h-screen py-6`}
      >
        <Card_ type_={`detail`}/>
        <Card_ type_={`multichoice`}/>
        <Card_ type_={`answers`}/>
      </div>
    </main>
  );
}
