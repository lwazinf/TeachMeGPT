import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { landingData_ } from "./utils/utils";

interface Feature_Props {}

const Feature_ = ({}: Feature_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // const [currentIdx_, setCurrentIdx_] = useState(true);
  // const [currentObj_, setCurrentObj_] = useState([
  //   {
  //     title: "About InSho!",
  //     first:
  //       "Duis ad proident adipisicing minim ut. Excepteur nisi laborum duis amet nostrud. Ullamco proident nulla duis duis est officia consequat reprehenderit excepteur incididunt ipsum quis occaecat. Ex do cillum qui occaecat voluptate minim ut culpa. Adipisicing ea id nisi ad amet ea occaecat velit voluptate. Et ea magna in Lorem non.",
  //     second:
  //       "Consectetur tempor ut cupidatat occaecat quis adipisicing aliqua qui aliquip enim reprehenderit. Elit magna do ipsum ad ad ea eu culpa. Laboris dolor adipisicing aliquip pariatur ea excepteur et. Nostrud est ex voluptate deserunt commodo dolore voluptate velit duis nisi consectetur.",
  //   },
  // ]);

  const [release_, setRelease_] = useState(false);
  const [card_, setCard_] = useState(true);
  const [idx_, setIdx_] = useState(0);
  const [button_, setButton_] = useState(true);
  const [currentObj_, setCurrentObj_] = useState(landingData_[idx_]);
  const [given_, setGiven_] = useState({
    first: currentObj_,
    second: landingData_[idx_ + 1],
  });

  const getIdx_ = () => {
    if (release_) {
      if (card_) {
        console.log("first");
        setGiven_({
          first: landingData_[idx_],
          second: given_.second,
        });
        console.log(idx_);
      } else {
        console.log("second");
        setGiven_({
          first: given_.first,
          second: landingData_[idx_],
        });
        console.log(idx_);
      }
    }
  };

  const release = () => {
    setRelease_(true);
  };
  useEffect(() => {
    release();
    getIdx_();
  }, [card_]);

  return (
    <div
      className={`w-full min-h-screen flex flex-row justify-between items-center relative overflow-hidden`}
    >
      <div className={`bg-white w-full h-full absolute z-[-1]`} />
      <motion.div
        style={{ y }}
        className={`w-[30%] min-h-screen flex flex-col justify-center items-center relative left-[300px]`}
      >
        <div
          className={`w-full h-[60px] flex-row justify-start items-center flex relative z-[1]`}
        >
          <div
            className={`w-full h-[150px] flex-col justify-start items-start flex absolute transition-all ${
              card_
                ? "top-0 opacity-100 duration-[1500ms] pointer-events-auto"
                : "top-[-10px] opacity-0 pointer-events-none duration-0"
            }`}
          >
            <p
              className={`text-justify text-[80px] font-black text-black/80 my-1 _squada relative bottom-[200px] tracking-tighter`}
            >
              {given_.first.title}
            </p>
            <p
              className={`font-light text-[14px] hover:text-black text-black/50 duration-500 transition-all leading-[20px] w-[550px] italic relative bottom-[200px]`}
            >
              {given_.first.first}
            </p>
            <p
              className={`font-light text-[14px] hover:text-black text-black/50 duration-500 transition-all leading-[20px] w-[550px] italic relative bottom-[200px] mt-3`}
            >
              {given_.first.second}
            </p>
          </div>
          <div
            className={`w-full h-[150px] flex-col justify-start items-start flex absolute transition-all ${
              !card_
                ? "top-0 opacity-100 duration-[1500ms] pointer-events-auto"
                : "top-[-10px] opacity-0 pointer-events-none duration-0"
            }`}
          >
            <p
              className={`text-justify text-[80px] font-black text-black/80 my-1 _squada relative bottom-[200px] tracking-tighter`}
            >
              {given_.second.title}
            </p>
            <p
              className={`font-light text-[14px] hover:text-black text-black/50 duration-500 transition-all leading-[20px] w-[550px] italic relative bottom-[200px]`}
            >
              {given_.second.first}
            </p>
            <p
              className={`font-light text-[14px] hover:text-black text-black/50 duration-500 transition-all leading-[20px] w-[550px] italic relative bottom-[200px] mt-3`}
            >
              {given_.second.second}
            </p>
          </div>

          <div
            className={`flex flex-row justify-center items-center ml-auto z-[2]`}
          >
            <div
              className={`min-w-0 min-h-0 px-4 py-2 rounded-[2px] hover:bg-[#ff573a] bg-[#fb705d] ${idx_ > 0 ? 'opacity-100' : 'opacity-50'} transition-all duration-200 mt-[350px] text-white font-black text-[15px] flex flex-row justify-center items-center my-2 m-1 cursor-pointer`}
              onClick={() => {
                if (idx_ > 0) {
                  setButton_(true);
                  setIdx_(idx_ - 1);
                  setCard_(!card_);
                }
              }}
            >
              <FontAwesomeIcon icon={faAngleLeft} className={``} />
            </div>
            <div
              className={`min-w-0 min-h-0 px-4 py-2 rounded-[2px] hover:bg-[#ff573a] bg-[#fb705d] ${idx_ < landingData_.length - 1 ? 'opacity-100' : 'opacity-50'} transition-all duration-200 mt-[350px] text-white font-black text-[15px] flex flex-row justify-center items-center my-2 m-1 cursor-pointer transition-all duration-200`}
              onClick={() => {
                if (idx_ < landingData_.length - 1) {
                  setButton_(false);
                  setIdx_(idx_ + 1);
                  setCard_(!card_);
                }
              }}
            >
              <FontAwesomeIcon icon={faAngleRight} className={``} />
            </div>
          </div>
        </div>

        {/* {currentObj_.map((obj_, index) => {
          return (<div className={`flex flex-col justify-center items-center`} key={index}>
          <p
            className={`text-justify text-[80px] font-black text-black/80 my-1 _squada tracking-tighter`}
          >
            {obj_.title}
          </p>
          <p
            className={`text-justify text-[16px] hover:text-black duration-500 transition-all font-normal text-black/60 my-2 _inter`}
          >
            {obj_.first}
          </p>
          <p
            className={`text-justify text-[16px] hover:text-black duration-500 transition-all font-normal text-black/60 my-2 _inter`}
          >
            {obj_.second}
          </p>
        </div>)
        })} */}
      </motion.div>

      <img src={"/assets/images/technology.png"} className={`w-[700px] object-cover right-[80px] absolute ${idx_ == 0 ? 'opacity-100 pointer-events-auto duration-[1800ms] mb-[200px]' : 'opacity-0 pointer-events-none duration-[25ms] mb-[250px]'} transition-all mix-blend-multiply`} />
      <img src={"/assets/images/idea.png"} className={`w-[700px] object-cover right-[80px] absolute ${idx_ == 1 ? 'opacity-100 pointer-events-auto duration-[1800ms] mb-[200px]' : 'opacity-0 pointer-events-none duration-[25ms] mb-[250px]'} transition-all mix-blend-multiply`} />
      <img src={"/assets/images/smart.png"} className={`w-[700px] object-cover right-[80px] absolute ${idx_ == 2 ? 'opacity-100 pointer-events-auto duration-[1800ms] mb-[200px]' : 'opacity-0 pointer-events-none duration-[25ms] mb-[250px]'} transition-all mix-blend-multiply`} />
      <img src={"/assets/images/alumni.png"} className={`w-[700px] object-cover right-[80px] absolute ${idx_ == 3 ? 'opacity-100 pointer-events-auto duration-[1800ms] mb-[200px]' : 'opacity-0 pointer-events-none duration-[25ms] mb-[250px]'} transition-all mix-blend-multiply`} />
    </div>
  );
};

export default Feature_;

interface Laptop_Props {
  img: string,
  idx: any,
  base: any
}

const Laptop_ = ({ img, idx, base }: Laptop_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <motion.div
      style={{ y }}
      className={`min-w-[200px] min-h-screen flex flex-col justify-center items-center right-[-200px] absolute`}
    >
      <div className={`${idx == base ? 'opacity-100 pointer-events-auto duration-[1800ms] bottom-[0px]' : 'opacity-0 pointer-events-none duration-[25ms] bottom-[25px]'} relative transition-all flex flex-col`}>
      <div
        className={`flex flex-col justify-center items-start w-full h-screen relative`}
      >
        <img src={`/assets/laptop.png`} className={`w-[1000px] object-cover`} />
      </div>
      <div
        className={`flex flex-col justify-center items-start w-full h-screen absolute top-0 transition-all`}
      >
        <div
          className={`w-[796px] h-[472px] bg-red-400 relative left-[102px] bottom-[15px]`}
        >
          <img src={img} className={`w-full object-cover`} />
        </div>
      </div>
      </div>
    </motion.div>
  );
};
