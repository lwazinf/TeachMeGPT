import Image from "next/image";
import Card_ from "./components/Card_";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div
        className={`flex flex-col justify-center items-center w-full min-h-screen`}
      >
        <Card_ type_={`detail`}/>
        <Card_ type_={`multichoice`}/>
      </div>
    </main>
  );
}
