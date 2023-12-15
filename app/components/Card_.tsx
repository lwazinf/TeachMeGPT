"use client";

import {
  faArrowRotateBack,
  faQuestion,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Detail_, MultiChoice_ } from "./utils/AuxUI_";
import { useRecoilState } from "recoil";
import {
  AnswerState,
  DataState,
  LoadingState,
  ObjectState,
  SignalState,
  InterState,
  UserState,
} from "./atoms/atoms";
import { curriculum_ } from "./utils/utils";
import { recordTest_ } from "@/firebase";

interface MainCard_Props {
  section_: any;
}

const MainCard_ = ({ section_ }: MainCard_Props) => {
  return (
    <div className={`relative flex flex-row justify-center items-center`}>
      <Referral_ section_={section_} />
      <div
        className={`absolute w-full h-full top-0 mx-auto duration-200 transition-all flex flex-row justify-center items-center`}
      >
        <Card_ section_={section_} />
      </div>
    </div>
  );
};

export default MainCard_;

// // // // // // // // // TitleSection_

interface TitleSection_Props {
  obj_: any;
}

const TitleSection_ = ({ obj_ }: TitleSection_Props) => {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [hint_, setHint_] = useState(false);
  const [dataState_, setDataState_] = useRecoilState(DataState);
  const [signal_, setSignal_] = useRecoilState(SignalState);
  return (
    <div
      className={`flex flex-col justify-start items-start w-full min-h-[100px] px-4 pb-3 pt-6`}
    >
      <div
        className={`flex flex-row justify-between items-start w-full min-h-2 px-4 pt-6`}
      >
        <p className={`font-medium text-[17px]`}>{dataState_.t}</p>
        {/* <FontAwesomeIcon
          icon={faQuestion}
          className={`w-[9px] cursor-pointer hover:text-black text-black/30 transition-all duration-200 px-[6px] rounded-[5px] ml-auto mr-2 mt-1`}
          onMouseEnter={() => {
            setHint_(true);
          }}
          onMouseLeave={() => {
            setHint_(false);
          }}
        /> */}
        {/* <FontAwesomeIcon
          icon={faArrowRotateBack}
          className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200 mt-1`}
          onClick={() => {
            setSignal_(signal_ + 1);
          }}
        /> */}
      </div>
      <div
        className={`flex flex-row justify-between items-start w-full min-h-2 pl-4 pr-[28px] pt-2`}
      >
        <p className={`text-[13px] text-black/50 leading-4`}>{dataState_.cs}</p>
      </div>
    </div>
  );
};

interface Referral_Props {
  section_: any;
}

const Referral_ = ({ section_ }: Referral_Props) => {
  const [loading_, setLoading_] = useRecoilState(LoadingState);
  const [imageData_, setImageData_] = useState("");

  const data_ = [
    "https://images.pexels.com/photos/12152921/pexels-photo-12152921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/12330594/pexels-photo-12330594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/6525756/pexels-photo-6525756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  let lastIndex = -1; // Initialize with an invalid index

  const runSwop = () => {
    const dataLength = data_.length;
    let randomIndex;

    // Generate a random index different from the last one
    do {
      randomIndex = Math.floor(Math.random() * dataLength);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex; // Update the last index

    const randomValue = data_[randomIndex];
    return randomValue;
  };

  return (
    <div
      className={`w-[650px] h-[700px] relative rounded-[4px] overflow-hidden ${
        !loading_ ? "opacity-100" : "opacity-0"
      } duration-200 transition-all`}
    >
      <img src={runSwop()} className={`h-[700px] w-full object-cover`} />
      <div
        className={`flex flex-row justify-center items-end absolute top-0 w-full h-full`}
      >
        <img
          src={`/assets/images/logo.png`}
          className={`w-[150px] object-cover absolute top-4 invert opacity-80 animate-pulse`}
        />
        <div
          className={`flex flex-row justify-center items-center w-full min-h-[80px] bg-black/10 backdrop-blur-md p-2`}
        >
          <div className={`w-[25px] h-[25px] relative overflow-hidden  mx-2`}>
            <FontAwesomeIcon
              icon={faSpinner}
              className={`animate-spin text-[20px] text-white`}
            />
          </div>
          <p className={`text-white/90 font-medium text-[15px]`}>
            Loading your next challenge..
          </p>
        </div>
      </div>
    </div>
  );
};

interface Card_Props {
  section_: any;
}

const Card_ = ({ section_ }: Card_Props) => {
  const [object_, setObject_] = useRecoilState(ObjectState);
  const [signal_, setSignal_] = useRecoilState(SignalState);
  const [user_, setUser_] = useRecoilState(UserState);
  const [givenA_, setGivenA_] = useState({});
  const [aux_, setAux_] = useState({});
  const [trigger_, setTrigger_] = useState(true);
  const [loading_, setLoading_] = useRecoilState(LoadingState);
  const [selectedQ_, setSelectedQ_] = useState({ q: "", o: [] });
  const [selectedA_, setSelectedA_] = useRecoilState(AnswerState);
  const [dataState_, setDataState_] = useRecoilState(DataState);
  const [inter_, setInter_] = useRecoilState(InterState);

  const URL = "https://api.openai.com/v1/chat/completions";

  const getData = async () => {
    setGivenA_({});
    setLoading_(false);

    // Get a random list name
    const listNames = Object.keys(curriculum_);
    const finalList = listNames.filter((obj_) => {
      return !inter_.includes(obj_);
    });
    const randomListName =
      finalList[Math.floor(Math.random() * finalList.length)];

    // Get a random item from the selected list
    // @ts-ignore
    const randomList = curriculum_[randomListName];
    const randomItem =
      randomList[Math.floor(Math.random() * randomList.length)];

    setAux_({ topic: randomItem, category: randomListName });

    // Print the random list name and item together
    // console.log(`List Name: "${randomListName}"\nRandom Item: "${randomItem}"`);

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a car insurance professional with the aim of teaching",
        },
        {
          role: "user",
          content: `write a case study with a minimum of 80 and a maximum of 80 words about "${randomItem}", from the car insurance topic "${randomListName}", and give me 3 short solution based critical thinking questions in context with the case study. for each question, have 3 multiple choice options as answers. return a javascript map {cs: CaseStudy, t: CaseStudyTitle, tips: a tip on how to best answer the questions, q: [QUESTIONS (No numbering, each question is an object {q: Question, o:[options (No numbering just plain text)], a: CORRECT ANSWER})]}`,
        },
      ],
      temperature: 0.1,
      // stream: true,
    };

    const response = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    // console.log(JSON.parse(data?.choices[0].message.content));
    setDataState_(JSON.parse(data?.choices[0].message.content));

    setSelectedQ_({ q: "", o: [] });
    setLoading_(true);
  };

  function handleQuestionRemoval(question_: any) {
    const input_ = object_.filter((sample_) => {
      return sample_.uid == section_.uid;
    })[0];
    const output_ = input_?.data.filter((sample_: any) => {
      return question_ !== sample_;
    });
    setObject_([
      object_.filter((sample_) => {
        return sample_.uid !== section_.uid;
      })[0],
      { ...input_, data: output_ },
    ]);
  }

  function handleQuestionAddition(question_: any) {
    console.log("handleQuestionAddition");
    const { q, ...dataTemp_ } = dataState_;

    let result_ = 0;
    let tempList_ = [];

    for (const question in givenA_) {
      // Make the object extensible
    // @ts-ignore
      const filteredObject = dataState_.q.find((obj_) => obj_.q === question);

      if (filteredObject) {
        let tempMap = new Map();

        // Assuming filteredObject is an array of key-value pairs
        for (const [key, value] of Object.entries(filteredObject)) {
          tempMap.set(key, value);
        }
        tempList_.push(
    // @ts-ignore
          Object.fromEntries(tempMap.set("given", givenA_[question]))
        );
    // @ts-ignore
        if (givenA_[question] == filteredObject.a) {
          result_ = result_ + 1;
        }
      }
    }

    // @ts-ignore
    dataTemp_.q = tempList_;

    let finalObj_ = new Map();
    for (const [key, value] of Object.entries(dataTemp_)) {
      finalObj_.set(key, value);
    }
    finalObj_.set("r", (result_ / 3) * 100);
    finalObj_.set("uid", user_.uid);
    // @ts-ignore
    finalObj_.set("c", aux_.category);

    console.log(Object.fromEntries(finalObj_));
    recordTest_(Object.fromEntries(finalObj_))
    getData();
  }

  const handleTemporaryAddition = (question_: any) => {
    console.log("handleTemporaryAddition");

    const temp_ = givenA_;
    const tempObj_ = {
      ...temp_,
      [question_]: selectedA_,
    };
    setGivenA_(tempObj_);
    setSelectedQ_({ q: "", o: [] });
    setTrigger_(!trigger_);

    setSelectedA_({ data: "", answer: "" });
  };

  // useEffect(() => {
  //   if (selectedA_.data?.substring(0, 3) == `${section_.uid} -`) {
  //     selectedA_.data?.replace(
  //       new RegExp(selectedA_.data?.substring(0, 4), "g"),
  //       ""
  //     ),
  //       section_.uid == selectedA_.data?.substring(0, 1);
  //   } else {
  //   }
  // }, [selectedA_, section_.uid]);

  useEffect(() => {
    getData();
  }, [signal_]);
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        loading_
          ? "w-[450px] opacity-100 duration-500"
          : "min-w-0 opacity-0 duration-0"
      } min-h-[20px] bg-white shadow-md rounded-[8px] relative overflow-hidden mb-3 transition-all`}
    >
      {loading_ && <TitleSection_ obj_={section_} />}
      {loading_ && section_.media && (
        <div
          className={`flex flex-col justify-center items-start w-[385px] min-h-[200px] transition-all duration-500`}
        >
          <div
            className={`w-full h-[200px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mb-2 cursor-pointer`}
          />
          <p
            className={` pb-2 w-full text-[13px] text-black/50 leading-4 text-left`}
          >
            Media:
          </p>
          <div
            className={`w-full h-[60px] rounded-sm mb-2 mt-[-4px] flex flex-row justify-start items-center`}
          >
            <div
              className={`w-[60px] h-[60px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mx-[1px] cursor-pointer`}
            />
            <div
              className={`w-[60px] h-[60px] bg-black/30 hover:bg-black/80 transition-all duration-500 hover:duration-0 rounded-[4px] mx-1 cursor-pointer`}
            />
          </div>
        </div>
      )}
      {loading_ && dataState_.q.length > 0 && (
        <div className={`w-[80%] h-[0.5px] bg-black/50 mb-0`} />
      )}
      {loading_ &&
        dataState_.q.map((obj_: any, index: number) => {
          return (
            <div
              className={`text-[13px] text-black/30 leading-4 text-left w-full px-8 my-2 flex flex-row`}
              key={index}
            >
              <p className={`w-[50px] pointer-events-none text-black`}>{`${
                index + 1
              } `}</p>
              {/* <p
              className={`hover:text-black/60 cursor-pointer ${
                obj_ == selectedQ_ && "animate-pulse"
              } transition-all duration-500 
              ${
                // object_
                //   .filter((obj__) => {
                //     return obj__.uid == section_.uid;
                //   })[0]
                //   ?.data.includes(obj_) && "line-through"
                obj_ in givenA_ && "line-through"
              }
              `}
              onClick={() => {
                if (obj_ in givenA_) {
                  const temp_: any = { ...givenA_ }; // Create a copy of givenA_ to avoid modifying it directly
                  const key_ = `${obj_}`; // Assuming obj_ is a key you want to delete
                  delete temp_[key_]; // Use the delete operator with key_ to remove the specific key
                  setGivenA_(temp_); // Log the key (not the object)
                  setSelectedQ_("");
                } else {
                  if (selectedQ_ !== obj_) {
                    setSelectedQ_(obj_);
                  } else {
                    setSelectedQ_("");
                  }
                }
              }}
            >{`${obj_}`}</p> */}
              <p
                className={`hover:text-black/60 cursor-pointer ${
                  obj_ == selectedQ_ && "animate-pulse"
                } transition-all duration-500 
              ${
                // object_
                //   .filter((obj__) => {
                //     return obj__.uid == section_.uid;
                //   })[0]
                //   ?.data.includes(obj_) && "line-through"
                obj_.q in givenA_ && "line-through"
              }
              w-full pr-2
              `}
                onClick={() => {
                  if (obj_.q in givenA_) {
                    const temp_: any = { ...givenA_ }; // Create a copy of givenA_ to avoid modifying it directly
                    const key_ = `${obj_.q}`; // Assuming obj_ is a key you want to delete
                    delete temp_[key_]; // Use the delete operator with key_ to remove the specific key
                    setGivenA_(temp_); // Log the key (not the object)
                    setSelectedQ_({ q: "", o: [] });
                  } else {
                    if (selectedQ_ !== obj_) {
                      setSelectedQ_(obj_);
                    } else {
                      setSelectedQ_({ q: "", o: [] });
                    }
                  }
                }}
    // @ts-ignore
              >{`${dataState_.q[index].q}`}</p>
            </div>
          );
        })}
      {loading_ && (
        <div
          className={`w-[80%] h-[0.5px] bg-black/50 transition-all duration-500 ${
    // @ts-ignore
            selectedQ_.length > 0 ? "opacity-100" : "opacity-0"
          } ${section_.type == "answers" ? "mb-1" : "mb-2"}`}
        />
      )}
      {loading_ && (
        <div
          className={`flex flex-col justify-start items-start w-full relative overflow-hidden ${
            selectedQ_.q.length > 0
              ? "opacity-100 top-0 pointer-events-auto min-h-[50px]"
              : "opacity-0 top-[-50px] pointer-events-none h-[0px]"
          } px-4 pt-1 transition-all duration-500`}
        >
          {dataState_.q.length !== Object.keys(givenA_).length &&
          section_.type == "multichoice"
            ? selectedQ_.o.map((obj_, index) => {
                return (
                  <MultiChoice_
                    key={index}
                    data={{ index: section_.uid, Q: selectedQ_, option: obj_ }}
                    trigger={trigger_}
                  />
                );
              })
            : section_.type == "detail" &&
              [1].map((obj_, index) => {
                return (
                  <Detail_
                    key={obj_}
                    trigger={trigger_}
                    data={{ index: section_.uid, Q: selectedQ_ }}
                  />
                );
              })}
        </div>
      )}
      {loading_ && (
        <div
          className={`flex flex-col justify-start items-start w-full relative px-4 transition-all duration-500`}
        >
          <div
            className={`flex flex-row justify-center items-center w-full h-[60px] px-4 rounded-md mb-3 hover:px-5 cursor-pointer transition-all duration-500 opacity-50 hover:opacity-100 hover:animate-pulse bg-blue-500/20 ${
              dataState_.q.length == Object.keys(givenA_).length &&
              "bg-green-500/20"
            } text-[15px] font-bold`}
            onClick={() => {
              if (dataState_.q.length == Object.keys(givenA_).length) {
                handleQuestionAddition(selectedQ_.q);
              } else {
                handleTemporaryAddition(selectedQ_.q);
              }
            }}
          >
            {/* <p className={`text-[13px] text-black/50`}>Add More</p> */}
            Proceed
            {/* <FontAwesomeIcon
              icon={faInfinity}
              className={`w-[12px] text-black/50 cursor-pointer hover:text-black transition-all duration-200`}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};
