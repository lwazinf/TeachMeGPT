import { useRecoilState } from "recoil";
import { Discover_ } from "./Discover_";
import Play_ from "./Play_";
import { InterState, ShowingState, SignalState } from "./atoms/atoms";
import { curriculum_ } from "./utils/utils";

interface Overlay_Props {}

const Overlay_ = ({}: Overlay_Props) => {
  const [showing_, setShowing_] = useRecoilState(ShowingState);
  const [inter_, setInter_] = useRecoilState(InterState);
  const [signal_, setSignal_] = useRecoilState(SignalState);
  const listNames = Object.keys(curriculum_);
  return (
    <div className={`flex flex-col justify-center items-center h-screen`}>
      <div
        className={`w-full min-h-screen bg-black/20 backdrop-blur-lg fixed top-0 ${
          showing_ == ""
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        } transition-all duration-200`}
      />
      <div
        className={`grid grid-cols-3 gap-1 place-content-center absolute left-10 mt-[190px] ${
          showing_ == "play"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-all duration-200`}
      >
        {listNames.map((obj_, index) => {
          return (
            <div
              className={`min-w-2 min-h-2 flex flex-row justify-center items-center ${
                inter_.includes(obj_)
                  ? "hover:bg-white/40 bg-red-500/40 hover:text-black/90 text-white/90"
                  : "bg-white/40 hover:bg-red-500/40 text-black/90 hover:text-white/90"
              } backdrop-blur-lg rounded-[3px] px-2 py-1 mx-1 cursor-pointer transition-all duration-200`}
              key={index}
              onClick={() => {
                if (inter_.includes(obj_)) {
                  const data_ = inter_.filter((obj__: any) => {
                    return obj__ != obj_;
                  });
                  setInter_(data_);
                } else {
                  const data_ = [...inter_, obj_];
                  setInter_(data_);
                }
              }}
            >
              <p className={`_inter font-bold text-[14px]`}>
                {obj_.split(" ")[0]}
              </p>
            </div>
          );
        })}
        {/* <div
            className={`min-w-2 min-h-2 flex flex-row justify-center items-center bg-white/40 hover:bg-black/40 text-black/90 hover:text-white/90 backdrop-blur-lg rounded-[3px] px-2 py-1 mx-1 cursor-pointer transition-all duration-200`}
            onClick={() => {
              setSignal_(signal_ + 1);
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} className={``} />
          </div> */}
      </div>
      {showing_ == "discover" ? (
        <Discover_ />
      ) : showing_ == "play" ? (
        <Play_ />
      ) : (
        <div />
      )}
    </div>
  );
};

export default Overlay_;
