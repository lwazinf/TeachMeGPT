import { motion, useScroll, useTransform } from "framer-motion";

interface Hero_Props {
    
}
 
const Hero_ = ({}:Hero_Props) => {
    return ( 
        <div
        className={`w-full min-h-screen bg-white flex flex-row justify-center items-center relative overflow-hidden`}
        id={`top`}
      >
          <BG_ />
          <Display_ value={`INSHO`} />
          <Graphic_ src={`/assets/cars.svg`} />
          {/* <MenuItem_ mapValues={["START LEARNING", "CONTACT US"]} /> */}
      </div>
     );
}
 
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

  interface Graphic_Props {
    src: string;
  }
  
  const Graphic_ = ({ src }: Graphic_Props) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
    return (
      <motion.div
          style={{ y }}
          className={`w-full min-h-screen absolute top-0 flex flex-col justify-center items-center`}
      >
        <img
          src={src}
          className={`w-[700px] object-cover relative top-[120px] opacity-[0.98]`}
        />
      </motion.div>
    );
  };
  
  const BG_ = () => {
    return (
      <div
        className={`w-full min-h-screen fixed top-0 flex flex-col justify-center items-center opacity-20`}
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
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    return (
      <motion.div
          style={{ y }}
          id="top"
        className={`w-full min-h-screen absolute top-0 flex flex-col justify-center items-center`}
      >
        <p
          className={`_squada text-[600px] text-[#333333] tracking-tighter relative top-[-50px]`}
        >
          {value}
        </p>
        </motion.div>
    );
  };