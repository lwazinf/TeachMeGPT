import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { DataState, GenderState } from "../components/atoms/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowAltCircleUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faBars,
  faFemale,
  faHamburger,
  faHeadphones,
  faMale,
  faMars,
  faPaperPlane,
  faPlane,
  faRobot,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { lessonData_ } from "../components/utils/utils";
import Nav_ from "../components/Nav_";
import DiscoverChat_ from "../components/DiscoverChat_";
import AudioPlayer_ from "../components/AudioPlayer_";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Discover_ />
    </main>
  );
}

const Trigger_ = ({}) => {
  const [next_, setNext_] = useState(true);
  const [loading_, setLoading_] = useState(false);

  const [data_, setData_] = useState({ data: "", example: "" });

  const data__ = [
    {
      data: "Car insurance is a contract between a policyholder and an insurance company. It provides financial protection in the event of an accident, theft, or damage to the insured vehicle.",
      example:
        "If a driver gets into a car accident and has car insurance, the insurance company may cover the cost of repairing or replacing the damaged vehicle, subject to the terms of the policy.",
    },
    {
      data: "Car insurance comes in various forms, including liability insurance (covers damage to others), comprehensive insurance (covers non-accident-related damage), and collision insurance (covers damage from accidents).",
      example:
        "A comprehensive policy could cover the cost of repairing a car damaged by hail or a fallen tree branch.",
    },
    {
      data: "Car insurance works by the policyholder paying regular premiums to the insurance company. In return, the insurer agrees to provide coverage for specified events or damages as outlined in the policy.",
      example:
        "When a policyholder gets into an accident and files a claim, the insurance company assesses the claim and, if approved, provides compensation based on the policy's terms.",
    },
    {
      data: "Car insurance is crucial because it protects both the driver and others from financial losses resulting from accidents, theft, or damage to vehicles. It also helps ensure that drivers meet legal requirements.",
      example:
        "Without car insurance, a driver involved in a severe accident could face significant financial burdens, including medical bills and repair costs, which insurance could help cover.",
    },
  ];

  const [dataState_, setDataState_] = useState(0);

  useEffect(() => {
    setLoading_(true);
    console.log("Loading..");
    setTimeout(() => {
      if (dataState_ == data__.length - 1) {
        setDataState_(0);
      } else {
        setDataState_(dataState_ + 1);
      }
      console.log(dataState_);
      setLoading_(false);
      console.log("Done!");
    }, 400);
  }, [next_]);

  return (
    <div
      className={`flex flex-row justify-center items-center w-[400px] min-h-screen`}
    >
      <div
        className={`flex flex-col justify-start items-center w-full duration-500 min-h-[400px] p-[1px] bg-white rounded-[8px] relative mb-3 transition-all mx-1`}
      >
        <div
          className={`flex flex-col justify-center items-center w-full h-[200px] p-[1px] ${
            loading_
              ? "mt-[200px] rounded-[8px] rounded-t-[2px] duration-200"
              : "mt-0 rounded-[8px] rounded-b-[2px] z-20 duration-500"
          } p-6 overflow-hidden transition-all mx-1 cursor-pointer absolute top-0`}
          onClick={() => {
            setNext_(!next_);
          }}
        >
          <div
            className={`flex flex-col justify-center items-center w-full h-full ${
              loading_
                ? "rounded-[8px] rounded-t-[2px] duration-200"
                : "rounded-[8px] rounded-b-[2px] duration-500"
            } p-6 bg-black shadow-md overflow-hidden transition-all mx-1 cursor-pointer`}
            onClick={() => {
              setNext_(!next_);
            }}
          >
            <p
              className={`text-[13px] text-white/50 leading-4 ${
                loading_ ? "opacity-0" : "opacity-100"
              } duration-500 transition-all`}
            >
              {data__[dataState_].data}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Discover_ = ({}) => {
  const [currIndex_, setCurrIndex_] = useState(0);
  const [robot_, setRobot_] = useState(false);
  const [currentData_, setCurrentData_] = useState<any>([])
  const [currDataIndex_, setCurrDataIndex_] = useState(0)
  const [atLesson_, setAtLesson_] = useState('11%')
  const [gender_, setGender_] = useRecoilState(GenderState)

  const initiateData_ = (idx_: number) => {
    setCurrentData_(lessonData_[idx_])
    console.log('Data Set')
  }

  useEffect(() => {
    initiateData_(currDataIndex_)
  }, [currDataIndex_])

  // Function to scroll to the next chapter
  const scrollToNextChapter = () => {
    const nextIndex = currIndex_ + 1;
    const nextFrame = document.getElementById(`frame_${nextIndex}`);
    if (nextFrame) {
      nextFrame.scrollIntoView({
        behavior: "smooth",
      });
      setCurrIndex_(nextIndex);
    } else {
      console.log("done");
    }
  };

  const containerRef = useRef(null); // Ref for the container element
  const frameHeight = 600; // Adjust this value to match the height of your frames

  // Function to update the currIndex_ based on the scroll position
  const updateCurrIndex = () => {
    const scrollTop = containerRef.current.scrollTop;
    const newIndex = Math.floor(scrollTop / frameHeight);
    setCurrIndex_(newIndex);
  };

  // Add a scroll event listener to the container element
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", updateCurrIndex);
    return () => {
      container.removeEventListener("scroll", updateCurrIndex);
    };
  }, []);

  return (
    <div
      className={`flex flex-row justify-center items-center w-[1000px] h-screen fixed top-0`}
    >
      <div
        className={`flex flex-row justify-start items-center w-full duration-500 min-h-[500px] p-1 bg-white rounded-[8px] relative mb-3 transition-all mx-1`}
      >
        <DiscoverChat_ robot_={robot_} data_={currentData_}/>
        <div
          className={`flex flex-col justify-between items-center w-full duration-500 h-[600px] relative transition-all overflow-hidden pt-3`}
        >
          <div
            className={`w-full min-h-[60px] flex flex-col justify-end items-start`}
          >
            <div
              className={`flex flex-row justify-between items-center w-full h-[60px] px-8`}
            >
              <img
                src={`/assets/images/logo.png`}
                className={`h-[40px] object-cover opacity-80`}
              />
            </div>
            <div className={`w-[90%] mx-auto h-[1px] bg-slate-200`} />
          </div>
          <div
            className={`w-full h-full overflow-scroll relative flex flex-col justify-start items-center`}
            ref={containerRef} // Attach the ref to the container element
          >
            {currentData_.map((obj_, index) => {
              return (
                <div
                  key={index}
                  id={`frame_${index}`}
                  className={`w-full min-h-[100%] flex flex-col justify-center items-center px-8`}
                >
                  {obj_.topic && (
                    <div
                      className={`flex flex-col justify-center items-center my-4`}
                    >
                      <p className={`text-[20px] font-medium _monts`}>
                        {obj_.topic.name}
                      </p>
                      <p
                        className={`text-[13px] font-normal text-center _inter`}
                      >
                        {obj_.topic.extra}
                      </p>
                    </div>
                  )}
                  {obj_.outcomes && (
                    <div className={``}>
                      {obj_.outcomes?.map((obj__, index_) => {
                        return (
                          <div
                            className={`flex flex-col justify-center items-center my-4`}
                            key={index_}
                          >
                            <p className={`text-[20px] font-medium _monts`}>
                              {obj__.name}
                            </p>
                            <p
                              className={`text-[13px] font-normal text-center _inter`}
                            >
                              {obj__.extra}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {obj_.jargon && (
                    <div className={``}>
                      {obj_.jargon?.map((obj__, index_) => {
                        return (
                          <div
                            className={`flex flex-col justify-center items-center my-4`}
                            key={index_}
                          >
                            <p className={`text-[20px] font-medium _monts`}>
                              {obj__.name}
                            </p>
                            <p
                              className={`text-[13px] font-normal text-center _inter`}
                            >
                              {obj__.extra}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {obj_.steps && (
                    <div className={``}>
                      {obj_.steps?.map((obj__, index_) => {
                        return (
                          <div
                            className={`flex flex-col justify-center items-center my-4`}
                            key={index_}
                          >
                            <p className={`text-[20px] font-medium _monts`}>
                              {obj__.step_description}
                            </p>
                            <p
                              className={`text-[13px] font-normal text-center _inter`}
                            >
                              {obj__.step_explanation}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            className={`w-full h-[80px] mt-2 flex flex-col justify-start items-center`}
          >
            <div className={`w-[90%] h-[1px] bg-slate-200 mb-1`} />
            <div
              className={`flex flex-row justify-between items-center w-full h-[60px] px-8`}
            >
              <div
                className={`flex flex-row justify-start items-center w-full min-h-2`}
              >
                <div
                  // href="#"
                  onClick={(e) => {
                    // e.preventDefault();
                    scrollToNextChapter();
                  }}
                  className={`cursor-pointer`}
                >
                  <div
                    className={`flex flex-row justify-center items-center bg-slate-200 hover:bg-black/80 cursor-pointer transition-all duration-200 rounded-[15px] p-[6px] px-3 text-black/50 hover:text-white/80`}
                  >
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className={`text-[12px] animate-bounce mt-1`}
                    />
                    <div className={`text-[12px] ml-2 pointer-events-none`}>
                      Next Chapter
                    </div>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faRobot}
                  onClick={() => {
                    setRobot_(!robot_);
                  }}
                  className={`text-[12px] rounded-[50%] p-2 ml-2 ${
                    robot_
                      ? "text-white/80 hover:text-black/50 hover:bg-slate-200 bg-black/80"
                      : "text-black/50 hover:text-white/80 bg-slate-200 hover:bg-black/80"
                  } cursor-pointer transition-all duration-200`}
                />
                <AudioPlayer_ audioSource={`/assets/audio/`} book_={`${currDataIndex_+1}`} />
                <FontAwesomeIcon
                  icon={gender_ == 'm' ? faMars : faVenus}
                  onClick={() => {
                    const gen_ = gender_ == 'm' ? 'f' : 'm'
                    setGender_(gen_);
                  }}
                  className={`text-[12px] rounded-[50%] p-2 mx-3 ml-1 text-black/50 hover:text-white/80 bg-slate-200 hover:bg-black/80 cursor-pointer transition-all duration-200`}
                />
              </div>
              <div className={`flex flex-row justify-center items-center`}>
                <div
                  className={`text-[12px] mx-2 text-black/50 cursor-default`}
                >
                  0{currDataIndex_+1}
                </div>
                <div className={`bg-slate-200 rounded w-[50px] h-[2px] mx-0`}>
                  <div className={`bg-slate-800 rounded w-[${atLesson_}] h-[2px] transition-all duration-200`} />
                </div>
                <div
                  className={`text-[12px] mx-2 mr-6 text-black/50 cursor-default`}
                >
                  0{lessonData_.length}
                </div>
                <div className={`flex flex-row justify-center items-center`}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className={`text-[12px] text-black/50 bg-slate-200 hover:text-white/80 hover:bg-black/80 cursor-pointer transition-all duration-200 rounded-l-[80%] p-[8px] flex flex-row justify-center items-end pl-[11px] ${currDataIndex_ == 0 && 'opacity-30'}`}
                    onClick={() => {
                      if (currDataIndex_ !== 0) {
                        const newIndex = currDataIndex_ - 1;
                        setCurrDataIndex_(newIndex);
                        console.log(`${((newIndex + 1) / lessonData_.length) * 100}%`);
                      }
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`text-[12px] text-black/50 bg-slate-200 hover:text-white/80 hover:bg-black/80 cursor-pointer transition-all duration-200 rounded-r-[80%] p-[8px] flex flex-row justify-center items-end pr-[11px] ${currDataIndex_ == lessonData_.length-1 && 'opacity-30'} `}
                    onClick={() => {
                      if (currDataIndex_ < lessonData_.length - 1) {
                        const newIndex = currDataIndex_ + 1;
                        setCurrDataIndex_(newIndex);
                        const percentage = `${Math.floor((newIndex + 1) / lessonData_.length * 100)}%`;
                        setAtLesson_(percentage);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
