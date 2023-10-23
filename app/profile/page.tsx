'use client'

import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAdd,
  faAngleLeft,
  faAngleRight,
  faAt,
  faGlobeAfrica,
  faPhone,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";

interface Script_Props {
  docData_: any;
  docLock_: boolean;
}
const Script_ = ({ docData_, docLock_ }: Script_Props) => {
  const [switched_, setSwitched_] = useState(false);
  const [email_, setEmail_] = useState("");
  const [phone_, setPhone_] = useState("");
  const [website_, setWebsite_] = useState("");
  const [linkedIn_, setLinkedIn_] = useState("");
  const [twitter_, setTwitter_] = useState("");
  const [instagram_, setInstagram_] = useState("");
  const [tag_, setTag_] = useState(["", "", "", ""]);

  // const [mT_, setMT_] = useRecoilState(MenuTray);

  // const [addOn_, setAddOn_] = useRecoilState(AddOn);
  // const [sO_, setSO_] = useRecoilState(ScriptObjects);
  const [images_, setImages_] = useState<any>();
  const [name_, setName_] = useState("");
  const [quote_, setQuote_] = useState("");
  const [rank_, setRank_] = useState("");
  const [age_, setAge_] = useState("");
  const [location_, setLocation_] = useState("");
  const [about_, setAbout_] = useState("");

  const inputFile = useRef(null);

  const onSelectFile = (e: { target: { files: any } }) => {
    const selectedFile = e.target.files;
    setImages_(selectedFile[0]);
    console.log(selectedFile[0]);
  };

  const [data_, setData_] = useState("");
  // const [data__, setData__] = useRecoilState(DataState);
  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

                    // @ts-ignore
  function base64ToFile(base64DataUrl, fileName) {
    const byteString = atob(base64DataUrl.split(",")[1]); // Remove the data:image/jpeg;base64 part
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: "image/jpeg" }); // Set the appropriate MIME type
    return new File([blob], fileName, { type: "image/jpeg" });
  }

  // const uploads_ = async (dataFile_: any) => {
  //   let data__ = [...dataFile_];
  //   await Promise.all(
  //     data__.map(async (element, index) => {
  //       if (element.type == "Image") {
  //         // Uncomment the following lines if needed
  //         try {
  //           let uploadedLink = await uploadImage(
  //             base64ToFile(element.link, "image.jpg")
  //           );
  //           let z_ = { ...element };
  //           z_.link = uploadedLink;
  //           data__[index] = z_;
  //         } catch (error) {
  //           console.error("Error:", error);
  //         }
  //       }
  //     })
  //   );
  //   return data__;
  // };

  async function handleSubmit() {
    const prompt = data_;

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          "/api/chatGPT?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <div
      className={`w-full min-h-screen flex flex-row justify-center items-center relative mb-12`}
    >
      <div
        className={`w-[1200px] min-h-screen bg-white/90 flex flex-col justify-start items-center rounded-[6px] shadow-md p-10 mt-8 relative`}
      >
        <div
          className={`w-full h-full flex flex-row justify-center items-center`}
        >
          <div
            className={`w-[40%] h-full flex flex-col justify-center items-center`}
          >
            <div
              className={`w-full h-[712px] rounded-[6px] flex flex-col justify-center items-center relative overflow-hidden shadow-sm ${
                !docLock_ && "cursor-pointer"
              }`}
              onClick={() => {
                // @ts-ignore
                if (!docLock_ & (inputFile != null)) {
                  // @ts-ignore
                  inputFile.current.click();
                }
              }}
            >
              {!docLock_ ? (
                <img
                  className={`w-full h-full object-cover opacity-90`}
                  src={`${
                    images_
                      ? URL.createObjectURL(images_)
                      : "/assets/images/bazooka.jpg"
                  }`}
                />
              ) : (
                <img
                  src={`${docData_?.image}`}
                  className={`w-full h-full object-cover opacity-90`}
                />
              )}
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={onSelectFile}
                accept="image/png, image/jpeg, image/webp"
                style={{ display: "none" }}
              />
            </div>
            <div
              className={`w-full h-[10%] rounded-[6px] flex flex-col justify-center items-center px-10 pt-2`}
            >
              {docLock_ ? (
                <p
                  className={`_inter text-[15px] text-center w-full font-thin text-black/50`}
                >
                  {docData_?.quote}
                </p>
              ) : (
                <textarea
                  className={`_inter text-[15px] text-center w-full font-thin text-black/50`}
                  placeholder="Short smart quote.."
                  value={quote_}
                  onChange={(obj_) => {
                    setQuote_(obj_.target.value);
                  }}
                />
              )}
            </div>
          </div>
          <div
            className={`w-[60%] h-full rounded-[6px] flex flex-col justify-start items-start pl-10 pt-[2px]`}
          >
            <div
              className={`w-full min-h-2 flex flex-row justify-start items-start`}
            >
              {docLock_ ? (
                <p
                  className={`min-h-0 font-black text-[30px] p-0 m-0 relative cursor-default text-black/70 transition-all duration-500`}
                >
                  {docData_?.name}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`min-h-0 font-black text-[30px] p-0 m-0 relative cursor-default text-black/70 transition-all duration-500`}
                  placeholder="Full Name"
                  value={name_}
                  onChange={(obj_) => {
                    setName_(obj_.target.value);
                  }}
                />
              )}
            </div>
            <div
              className={`w-full min-h-2 mt-4 flex flex-row justify-start items-start`}
            >
              {docLock_ ? (
                <p
                  className={`_oswald min-h-0 text-[17px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left`}
                >
                  {docData_?.rank}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_oswald min-h-0 text-[17px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left`}
                  placeholder="Title"
                  value={rank_}
                  onChange={(obj_) => {
                    setRank_(obj_.target.value);
                  }}
                />
              )}

              <div
                className={`w-[50%] flex flex-row justify-start items-start`}
              >
                <p
                  className={`_oswald min-h-0 text-[17px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 text-left`}
                >
                  Age:
                </p>
                {docLock_ ? (
                  <p
                    className={`_oswald min-h-0 text-[17px] font-thin p-0 ml-2 m-0 relative cursor-default text-black/70 transition-all duration-500 text-left`}
                  >
                    {docData_?.age}
                  </p>
                ) : (
                  <input
                    type="text"
                    className={`_oswald min-h-0 text-[17px] font-thin p-0 ml-2 m-0 relative cursor-default text-black/70 transition-all duration-500 text-left`}
                    placeholder="––"
                    value={age_}
                    onChange={(obj_) => {
                      setAge_(obj_.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className={`w-full min-h-2 mt-3 flex flex-row justify-start items-start`}
            >
              <div
                className={`flex flex-row justify-start items-start w-[50%] h-[30px] rounded-[4px]`}
              >
                {docData_?.tags
                  ? docData_?.tags.map((obj_: any) => {
                      return (
                        <div
                          className={`flex flex-row justify-center items-center min-w-[40px] h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 mr-2 text-black/50 hover:text-white/80`}
                          key={obj_.id}
                        >
                          <p
                            className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                          >
                            {obj_}
                          </p>
                        </div>
                      );
                    })
                  : [0, 1, 2, 3].map((obj__) => {
                      return (
                        <div
                          className={`flex flex-row justify-center items-center min-w-[40px] h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 mr-2 text-black/50 hover:text-white/80`}
                          key={obj__}
                        >
                          <input
                            className={`_oswald w-[50px] min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center bg-transparent`}
                            type="text"
                            placeholder="--"
                            onChange={(obj_) => {
                              const tag__ = tag_;
                              tag__[obj__] = obj_.target.value;
                              setTag_(tag__);
                            }}
                          ></input>
                        </div>
                      );
                    })}
                {/* {docLock_ &&
                  docData_?.tags.map((obj_) => {
                    return (
                      <div
                        className={`flex flex-row justify-center items-center min-w-[40px] h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 mr-2 text-black/50 hover:text-white/80`}
                        key={obj_.id}
                      >
                        <p
                          className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                        >
                          {obj_}
                        </p>
                      </div>
                    );
                  })} */}
              </div>
              <div
                className={`w-[50%] flex flex-row justify-start items-start`}
              >
                <p
                  className={`_oswald min-h-0 text-[17px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 text-left`}
                >
                  Location:
                </p>
                {docLock_ ? (
                  <p
                    className={`_oswald min-h-0 text-[17px] font-thin p-0 ml-2 m-0 relative cursor-default text-black/70 transition-all duration-500 text-left`}
                  >
                    {docData_?.location}
                  </p>
                ) : (
                  <input
                    type="text"
                    className={`_oswald min-h-0 text-[17px] font-thin p-0 ml-2 m-0 relative cursor-default text-black/70 transition-all duration-500 text-left`}
                    placeholder="Where do you live?"
                    value={location_}
                    onChange={(obj_) => {
                      setLocation_(obj_.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className={`w-full min-h-2 mt-10 flex flex-row justify-start items-start`}
            >
              <p
                className={`_oswald min-h-0 text-[16px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left`}
              >
                About Me
              </p>
              {!docLock_ && (
                <div
                  className={`w-8 h-8 flex flex-col justify-center items-center rounded-[3px]`}
                  onClick={() => {
                    console.log("List of chatGPT commands");
                    handleSubmit();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRobot}
                    className={`h-[22px] w-[22px] hover:text-black/5 text-black/10 transition-all duration-[400ms] cursor-pointer`}
                  />
                </div>
              )}
            </div>
            <div
              className={`w-full min-h-2 mt-2 flex flex-row justify-start items-start`}
            >
              {/* <p
                className={`_inter text-[14px] font-thin text-left text-black/80`}
              > */}
              {docLock_ ? (
                <p
                  className={`h-[126px] w-full _inter text-[14px] font-thin text-left text-black/80 min-h-2`}
                >
                  {docData_?.about}
                </p>
              ) : (
                <textarea
                  className={`h-[126px] w-full _inter text-[14px] font-thin text-left text-black/80 min-h-2`}
                  placeholder={`Write a short description about yourself..`}
                  value={about_}
                  onChange={(obj_) => {
                    setAbout_(obj_.target.value);
                    setData_(obj_.target.value);
                  }}
                ></textarea>
              )}

              {/* </p> */}
              {/* <div
                className={`w-[50px] h-full flex flex-col justify-start items-start`}
              >
                <div
                  className={`flex flex-row justify-center items-center min-w-[40px] h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 text-black/50 hover:text-white/80 my-1`}
                >
                  <p
                    className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                  >
                    Generate
                  </p>
                </div>
                <div
                  className={`flex flex-row justify-center items-center min-w-[40px] h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 text-black/50 hover:text-white/80 my-1`}
                >
                  <p
                    className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                  >
                    Improve
                  </p>
                </div>
                <div
                  className={`flex flex-row justify-end items-end w-full ml-2 min-h-1 relative`}
                >
                  <div
                    className={`flex flex-row justify-center items-center min-w-8 h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 mx-1 text-black/50 hover:text-white/80 my-1`}
                  >
                    <p
                      className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                    >
                      -
                    </p>
                  </div>
                  <div
                    className={`flex flex-row justify-center items-center min-w-8 h-[25px] rounded-[4px] bg-black/10 hover:bg-black/30 transition-all duration-[1000ms] hover:duration-200 cursor-pointer px-2 mx-1 text-black/50 hover:text-white/80 my-1`}
                  >
                    <p
                      className={`_oswald min-h-0 text-[14px] font-medium p-0 m-0 relative cursor-default transition-all duration-500 text-center pointer-events-none`}
                    >
                      +
                    </p>
                  </div>
                </div>
              </div> */}
            </div>

            <div>
              <div
                className={`w-full min-h-2 mt-10 flex flex-row justify-start items-start`}
              >
                <p
                  className={`_oswald min-h-0 text-[16px] font-thin p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left`}
                >
                  Project Highlights
                </p>
              </div>
              <div className={`w-full h-[270px] mt-5 grid grid-cols-2 gap-2`}>
                <div
                  className={`w-full h-full bg-black/10 rounded-[4px] flex justify-center items-center relative overflow-hidden`}
                >
                  <img
                    className={`w-full h-full object-cover opacity-70 scale-[0.9]`}
                    src={`/assets/images/helmet.jpg`}
                  />
                  <div className={`w-full h-full absolute transition-all`}>
                    <div
                      className={`w-full h-full bg-white/20 backdrop-blur-md`}
                    ></div>
                  </div>
                  <img
                    className={`w-full object-cover absolute ${
                      switched_
                        ? "hover:opacity-0 opacity-0"
                        : "hover:opacity-0 opacity-100"
                    } transition-all duration-1000 hover:duration-200`}
                    src={`/assets/images/helmet.jpg`}
                  />
                </div>
                <div
                  className={`w-full bg-black/10 rounded-[4px] flex justify-center items-center relative overflow-hidden`}
                >
                  <img
                    className={`w-full object-cover opacity-70 scale-[0.9]`}
                    src={`/assets/images/firearm.jpg`}
                  />
                  <div className={`w-full h-full absolute transition-all`}>
                    <div
                      className={`w-full h-full bg-white/20 backdrop-blur-md`}
                    ></div>
                  </div>
                  <img
                    className={`w-full object-cover absolute ${
                      switched_
                        ? "hover:opacity-0 opacity-0"
                        : "hover:opacity-0 opacity-100"
                    } transition-all duration-1000 hover:duration-200`}
                    src={`/assets/images/firearm.jpg`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`w-full h-[10%] rounded-[6px] flex flex-row justify-end items-center px-3 pt-2 relative top-4`}
            >
              {/* <p className={`_inter text-[15px] font-thin text-black/50`}>
                This weapon has no ammunition, I use it as a hammer though!
              </p> */}
              <div
                className={`h-[18px] w-[18px] mr-3`}
                onClick={() => {
                  setSwitched_(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className={`h-[18px] w-[18px] ${
                    !switched_
                      ? "hover:text-black/5 text-black/10 cursor-default"
                      : "hover:text-black/80 text-black/40 cursor-pointer"
                  } transition-all duration-[400ms]`}
                />
              </div>
              <div
                className={`h-[18px] w-[18px] ml-3`}
                onClick={() => {
                  setSwitched_(true);
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className={`h-[18px] w-[18px] ${
                    !switched_
                      ? "hover:text-black/80 text-black/40 cursor-pointer"
                      : "hover:text-black/5 text-black/10 cursor-default"
                  } transition-all duration-[400ms]`}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full h-[180px] mt-4 bg-black/5 opacity-90 rounded-[3px] flex flex-col justify-center items-center p-6 px-14 relative overflow-hidden mb-2`}
        >
          <div className={`w-full h-full flex flex-col absolute top-0`}>
            {!docLock_ ? (
              <img
                src={`${
                  images_
                    ? URL.createObjectURL(images_)
                    : "/assets/images/bazooka.jpg"
                }`}
                className={`w-full h-full object-cover opacity-20`}
              />
            ) : (
              <img
                src={`${docData_?.image}`}
                className={`w-full h-full object-cover opacity-20`}
              />
            )}
            <div className={`w-full h-full absolute transition-all`}>
              <div
                className={`w-full h-full bg-white/50 backdrop-blur-lg`}
              ></div>
            </div>
          </div>
          <div
            className={`w-full min-h-2 flex flex-row justify-between items-center my-2`}
          >
            <div
              className={`flex flex-row items-center justify-start w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faAt}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.email}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                  placeholder="you@server.com"
                  value={email_}
                  onChange={(obj_) => {
                    setEmail_(obj_.target.value);
                  }}
                />
              )}
            </div>
            <div
              className={`flex flex-row items-center justify-center w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faPhone}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 hover:text-black/60 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.phone}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 hover:text-black/60 transition-all duration-500 w-[50%] text-left pl-1`}
                  placeholder="000-000-0000"
                  value={phone_}
                  onChange={(obj_) => {
                    setPhone_(obj_.target.value);
                  }}
                />
              )}
            </div>
          </div>

          <div
            className={`w-full min-h-2 flex flex-row justify-between items-center my-2`}
          >
            <div
              className={`flex flex-row items-center justify-start w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.linkedIn}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                  value={linkedIn_}
                  onChange={(data_) => {
                    setLinkedIn_(data_.target.value);
                  }}
                  placeholder="username"
                />
              )}
            </div>
            <div
              className={`flex flex-row items-center justify-center w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.twitter}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                  value={twitter_}
                  onChange={(data_) => {
                    setTwitter_(data_.target.value);
                  }}
                  placeholder="username"
                />
              )}
            </div>
          </div>

          <div
            className={`w-full min-h-2 flex flex-row justify-between items-center my-2`}
          >
            <div
              className={`flex flex-row items-center justify-start w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faGlobeAfrica}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.website}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                  placeholder="ofscript.ai"
                  value={website_}
                  onChange={(obj_) => {
                    setWebsite_(obj_.target.value);
                  }}
                />
              )}
            </div>
            <div
              className={`flex flex-row items-center justify-center w-full h-full`}
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className={`h-[20px] w-[20px] mr-4 text-black/70 hover:text-black/60 ml-2 transition-all duration-[400ms] cursor-pointer`}
              />
              {docLock_ ? (
                <p
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                >
                  {docData_?.instagram}
                </p>
              ) : (
                <input
                  type={`text`}
                  className={`_inter bg-transparent min-h-0 text-[15px] font-medium p-0 m-0 relative cursor-default text-black/40 transition-all duration-500 w-[50%] text-left pl-1`}
                  value={instagram_}
                  onChange={(data_) => {
                    setInstagram_(data_.target.value);
                  }}
                  placeholder="username"
                />
              )}
            </div>
          </div>
        </div>
        {/* {docData_.features != undefined &&
          docData_.features.map((obj_: any) => {
            return (
              <div className="w-full justify-center items-center flex flex-row">
                {obj_.type == "Label" ? (
                  <Label_ uuid_={obj_.uid} docLock_={true} docData_={obj_} />
                ) : (
                  <Image_ uuid_={obj_.uid} docLock_={true} docData_={obj_} />
                )}
              </div>
            );
          })} */}
        {/* {sO_.map((obj_) => {
          if (
            // @ts-ignore
            obj_.type == "Profiles"
          ) {
            return (
              // @ts-ignore
              <Profiles_ uuid_={obj_.uid} />
            );
          } else if (
            // @ts-ignore
            obj_.type == "Video Player"
          ) {
            return (
              // @ts-ignore
              <Video_ uuid_={obj_.uid} />
            );
          } else if (
            // @ts-ignore
            obj_.type == "Label"
          ) {
            return (
              // @ts-ignore
              <Label_ uuid_={obj_.uid} docLock_={false} />
            );
          } else if (
            // @ts-ignore
            obj_.type == "Image"
          ) {
            return (
              // @ts-ignore
              <Image_ uuid_={obj_.uid} />
            );
          }
        })} */}

        {/* {!docLock_ && (
          <div
            className={`w-full h-[180px] mt-4 bg-black/10 opacity-30 hover:opacity-60 rounded-[3px] flex flex-col justify-center items-center p-6 px-14 relative overflow-hidden transition-all duration-400 hover:duration-200 cursor-pointer`}
            onClick={() => {
              // setAddOn_(true);
              setMT_(true);
            }}
          >
            <div
              className={`w-[30px] h-[30px] opacity-50  rounded-[50%] flex flex-col justify-center items-center`}
            >
              <FontAwesomeIcon
                icon={faAdd}
                className={`h-[20px] w-[20px] text-black/70 hover:text-black/60 transition-all duration-[400ms] cursor-pointer`}
              />
            </div>
          </div>
        )} */}
        {/* <div className={`w-full flex flex-row justify-end items-center mt-4`}>
          <p
            className={`_inter cursor-pointer transition-all duration-200 text-[14px] text-left mx-2 font-thin pl-1 text-black/30 hover:text-red-500/80 mt-2`}
            onClick={() => {
              setSO_([]);
            }}
          >
            Clear
          </p>
          <p
            className={`_inter cursor-pointer transition-all duration-200 text-[14px] text-left mx-2 font-thin pl-1 text-black/50 hover:text-red-500/80 mt-2`}
            onClick={async () => {
              const uuid_ = uuid();

              let uploadedLink = await uploadImage(images_)
                .then((downloadURL) => {
                  return downloadURL;
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
              // createResume_({
              console.log({
                uuid: uuid_,
                name: name_,
                tags: tag_,
                quote: quote_,
                rank: rank_,
                age: age_,
                location: location_,
                about: about_,
                email: email_,
                phone: phone_,
                website: website_,
                linkedIn: linkedIn_,
                twitter: twitter_,
                instagram: instagram_,
                features: await uploads_(sO_),
                image: uploadedLink,
              });
              console.log(typeof images_);
            }}
          >
            Save
          </p>
          <p
            className={`_inter cursor-pointer transition-all duration-200 text-[14px] text-left mx-2 font-thin pl-1 text-black/50 hover:text-red-500/80 mt-2`}
            onClick={() => {
              console.log(docData_.features);
            }}
          >
            Share
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Script_;
