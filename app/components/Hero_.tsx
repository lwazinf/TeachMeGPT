import { faBook, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useScroll, useTransform } from "framer-motion";

interface Hero_Props {}

const Hero_ = ({}: Hero_Props) => {
  return (
    <div
      className={`w-full min-h-screen bg-white flex flex-row justify-center items-center relative overflow-hidden`}
      id={`top`}
    >
      <BG_ />
      <Display_ value={`INSHO`} />
      <Graphic3_ src={`/assets/images/birds.svg`} />
      <Graphic2_ src={`/assets/images/skyscraper.svg`} />
      <Graphic_ src={`/assets/images/crash.svg`} />
      {/* <MenuItem_ mapValues={["START LEARNING", "CONTACT US"]} /> */}
    </div>
  );
};

export default Hero_;

// // // // // // // misc.

interface MenuItem_Props {
  mapValues: any;
}

const MenuItem_ = ({ mapValues }: MenuItem_Props) => {
  // <div className={`min-w-0 min-h-full absolute right-0 bg-red-400`}>
  //   <p className={`-rotate-90 text-[18px]  m-0`}>
  //     {value}
  //   </p>
  // </div>;

  return (
    <div
      className={`min-w-0 min-h-screen fixed right-0 top-0 flex flex-col justify-center items-end`}
    >
      {mapValues.map((obj_: string, index: number) => {
        return (
          <div
            key={index}
            className={`min-w-[50px] min-h-2 justify-center items-center flex flex-row cursor-pointer mr-3 my-2`}
          >
            <p className={`text-[15px] pointer-events-none`}>
              {obj_.split(" ")[0]}
            </p>
            <p
              className={`text-[15px] font-black text-black/80 underline pointer-events-none`}
            >
              {obj_.split(" ")[1]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const BG_ = () => {
  return (
    <div
      className={`w-full min-h-screen fixed top-0 flex flex-col justify-center items-center opacity-20 pointer-events-none`}
    >
      <div
        className={`w-[1px] h-full absolute left-[450px] border-l-[1px] border-dashed border-black/50`}
      />
      <div
        className={`w-[1px] h-full absolute left-[150px] border-l-[1px] border-dashed border-black/80`}
      />
      <div
        className={`h-[1px] w-full absolute top-[150px] border-b-[2px] border-dashed border-black`}
      />
      <div
        className={`w-[1px] h-full absolute right-[150px] border-l-[2px] border-dashed border-black/40`}
      />
      <div
        className={`w-[1px] h-full absolute right-[150px] border-l-[2px] border-dashed border-black/40`}
      />
      <div
        className={`h-[1px] w-full absolute top-[250px] border-b-[1px] border-dashed border-black/80`}
      />
      <div
        className={`h-[1px] w-full absolute bottom-[50px] border-b-[2px] border-dashed border-black/80`}
      />
      <div
        className={`h-[1px] w-full absolute bottom-[80px] border-b-[2px] border-dashed border-black/30`}
      />
    </div>
  );
};

interface Display_Props {
  value: string;
}

const Display_ = ({ value }: Display_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  return (
    <motion.div
      style={{ y }}
      id="top"
      className={`w-full min-h-screen absolute top-0 flex flex-row justify-center items-center`}
    >
      <div className={`h-[410px] w-full relative overflow-hidden flex flex-row justify-center items-center`}>
      {value.split("").map((obj_, index) => {
        const position = value.indexOf(obj_);
        return (
          <div className={`flex flex-col justify-center items-center relative h-[400px]`} key={index}>
          <p
            className={`_squada text-[600px] text-[#333333] ${obj_ == 'S' ? 'hover:text-[#412e2e]' : 'hover:text-[#2e3b41]'} transition-all duration-500 tracking-tighter mt-0 mb-0 relative cursor-pointer`}
          >
            {obj_}
          </p>
          {/* {
            (position !== -1 && position === value.length - 1)
            &&
            <div className={`flex flex-col justify-center items-center w-[20px] h-[20px] absolute right-[-10px] top-[0px]`}>
              <FontAwesomeIcon icon={faGraduationCap} className={`text-[200px] text-[#333333] rotate-[30deg]`} />
            </div>
          } */}
          {/* {
            (position !== -1 && position === 0)
            &&
            <div className={`flex flex-col justify-center items-center min-w-[20px] min-h-[20px] absolute left-[-50px] top-[30px]`}>
              <FontAwesomeIcon icon={faBook} className={`text-[50px] text-[#333333] -rotate-[30deg]`} />
            </div>
          } */}
          </div>
        );
      })}
      </div>
    </motion.div>
  );
};

interface Graphic_Props {
  src: string;
}

const Graphic_ = ({ src }: Graphic_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-2%"]);
  return (
    <motion.div
      style={{ y }}
      className={`w-full min-h-screen absolute top-0 flex flex-col justify-center items-center pointer-events-none`}
    >
      <img
        src={src}
        className={`w-[900px] object-cover relative top-[120px] opacity-[0.98]`}
      />
    </motion.div>
  );
};

interface Graphic2_Props {
  src: string;
}

const Graphic2_ = ({ src }: Graphic2_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return (
    <motion.div
      style={{ y }}
      className={`w-full min-h-screen absolute top-0 flex flex-col justify-center items-center pointer-events-none`}
    >
      <img
        src={src}
        className={`w-full object-cover relative bottom-[120px] opacity-10 invert`}
      />
    </motion.div>
  );
};

interface Graphic3_Props {
  src: string;
}

const Graphic3_ = ({ src }: Graphic3_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  return (
    <motion.div
      style={{ y }}
      className={`w-full min-h-screen absolute top-0 flex flex-col justify-center items-center pointer-events-none`}
    >
      <img
        src={src}
        className={`w-[60%] object-cover relative top-[50px]`}
      />
    </motion.div>
  );
};
