import { useScroll, useTransform, motion } from "framer-motion";
import Nav_ from "./Nav_";
import { MenuState, ThisState, UserState } from "./atoms/atoms";
import { usePathname } from "next/navigation";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faBars, faPerson, faTimes } from "@fortawesome/free-solid-svg-icons";

interface Tag_Props {
    initials: string;
  }
  
  export const Tag_ = ({ initials }: Tag_Props) => {
    const [showThis_, setShowThis_] = useRecoilState(ThisState);
    const [menu_, setMenu_] = useRecoilState(MenuState);
    const [user_, setUser_] = useRecoilState(UserState);
    const pathname = usePathname();
    return (
      <div
        className={`min-w-0 min-h-screen fixed left-0 top-0 flex flex-col justify-start items-center pt-20`}
      >
        <a href={pathname == "/" ? `#top` : pathname == "/profile" ? "/" : ""}>
          <div
            className={`min-w-[50px] h-[120px] bg-red-600 justify-end items-center flex flex-col text-white cursor-pointer`}
          >
            <p className={`text-[19px] font-black pointer-events-none`}>
              {initials}
            </p>
          </div>
        </a>
        <FontAwesomeIcon
          icon={faTwitter}
          className={`my-2 mt-4 text-[20px] opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer text-black hover:text-red-600`}
        />
        <FontAwesomeIcon
          icon={faFacebook}
          className={`my-2 text-[20px] opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer text-black hover:text-red-600`}
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className={`my-2 text-[20px] opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer text-black hover:text-red-600`}
        />
        <div className={`flex flex-col justify-center items-center min-w-0 min-h-0 relative`}>
          <FontAwesomeIcon
            icon={user_ && !menu_ ? faBars : user_ && menu_ ? faTimes : faPerson}
            className={`my-2 mt-8 text-[20px] opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer text-black hover:text-red-600 animate-pulse`}
            onClick={() => {
              user_ ? setMenu_(!menu_) : setShowThis_(!showThis_);
            }}
          />
          <Nav_/>
        </div>
      </div>
    );
  };
  
  const Tech_ = ({}) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    return (
      <div
        className={`w-full min-h-screen flex flex-row justify-between items-center relative overflow-hidden`}
      >
        <div className={`bg-white w-full h-full absolute z-[-1]`} />
        <motion.div
          style={{ y }}
          className={`w-[30%] min-h-screen flex flex-col justify-center items-center relative left-[300px]`}
        ></motion.div>
      </div>
    );
  };