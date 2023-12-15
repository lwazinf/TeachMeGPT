import {
  faAdd,
  faBook,
  faCog,
  faGear,
  faGears,
  faHandBackFist,
  faPaperPlane,
  faPeopleGroup,
  faPerson,
  faPlay,
  faPowerOff,
  faQrcode,
  faUser,
  faWandSparkles,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn_, signOut_ } from "@/firebase";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useRecoilState } from "recoil";
import { ShowingState, ThisState, MenuState } from "./atoms/atoms";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  const [showing_, setShowing_] = useRecoilState(ShowingState);
  const [menu_, setMenu_] = useRecoilState(MenuState);
  const pathname = usePathname()
  const router = useRouter()
  return (
      <div
        className={`md:w-[60px] min-w-0 md:min-h-2 min-h-2 rounded-lg md:flex-col flex-row justify-center items-center flex absolute bottom-[-150px] ${menu_ ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} duration-200 transition-all`}
      >
        {[
          {
            icon: faWrench,
            action: "navigate to homepage",
            element: "Home",
            alt: "auth",
          },
          {
            icon: faBook,
            action: "discover",
            element: "discover",
            alt: "auth",
          },
          {
            icon: faPlay,
            action: "play",
            element: "play",
            alt: "auth",
          },
        ].map((obj) => {
          return (
            <div
              className={`w-[80px] h-[40px] flex flex-row justify-center items-center my-[1px]`}
              key={obj.action}
            >
              <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200`}
                onMouseEnter={() => {
                  
                }}
                onMouseLeave={() => {
                  
                }}
                onClick={async () => {
                  if(obj.action == "navigate to homepage"){
                    router.push('/profile');
                    setMenu_(false) 
                  } else if (obj.action == "play"){
                    // router.push('/play');
                    if(showing_ == 'play'){
                      setShowing_('')
                      setMenu_(false)
                    }else{
                      setShowing_('play')
                      setMenu_(false)
                    }
                  } else if (obj.action == "discover"){
                    // router.push('/discover');
                    if(showing_ == 'discover'){
                      setShowing_('')
                      setMenu_(false)
                    }else{
                      setShowing_('discover')
                      setMenu_(false)
                    }
                  } else if (obj.action == "auth"){
                    router.push('/profile');
                    setMenu_(false)
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={obj.icon}
                  className={`w-[18px] h-[18px]`}
                />
              </div>
            </div>
          );
        })}
        <div
                className={`min-h-[20px] min-w-[20px] flex flex-row justify-center items-center cursor-pointer text-black/40 hover:text-black/60 transition-all duration-200`}
                onClick={async () => {
                  setMenu_(false)
                  signOut_()
                  setShowing_('')
                  router.push('/')
                }}
              >
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className={`w-[18px] h-[18px]`}
                />
              </div>
      </div>
  );
};

export default Nav_;
