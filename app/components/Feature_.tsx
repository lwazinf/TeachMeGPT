import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Feature_Props {
    
}
 
const Feature_= ({}:Feature_Props) => {
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
        >
          <p
            className={`text-justify text-[80px] font-black text-black/80 my-1 _squada tracking-tighter`}
          >
            About InSho!
          </p>
          <p
            className={`text-justify text-[16px] hover:text-black duration-500 transition-all font-normal text-black/60 my-2 _inter`}
          >
            Duis ad proident adipisicing minim ut. Excepteur nisi laborum duis
            amet nostrud. Ullamco proident nulla duis duis est officia consequat
            reprehenderit excepteur incididunt ipsum quis occaecat. Ex do cillum
            qui occaecat voluptate minim ut culpa. Adipisicing ea id nisi ad
            amet ea occaecat velit voluptate. Et ea magna in Lorem non.
          </p>
          <p
            className={`text-justify text-[16px] hover:text-black duration-500 transition-all font-normal text-black/60 my-2 _inter`}
          >
            Consectetur tempor ut cupidatat occaecat quis adipisicing aliqua qui
            aliquip enim reprehenderit. Elit magna do ipsum ad ad ea eu culpa.
            Laboris dolor adipisicing aliquip pariatur ea excepteur et. Nostrud
            est ex voluptate deserunt commodo dolore voluptate velit duis nisi
            consectetur.
          </p>
          <div
            className={`min-w-0 min-h-0 px-4 py-2 rounded-[2px] hover:bg-[#ff573a] bg-[#fb705d] text-white font-black text-[15px] flex flex-row justify-center items-center my-2 mt-8 ml-auto cursor-pointer transition-all duration-200`}
          >
            Begin
          </div>
        </motion.div>

        <Laptop_ />
      </div>
     );
}
 
export default Feature_;

interface Laptop_Props {}

const Laptop_ = ({}: Laptop_Props) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  return (
    <motion.div
      style={{ y }}
      className={`min-w-[200px] min-h-screen flex flex-col justify-center items-center relative left-[200px]`}
    >
      <div
        className={`flex flex-col justify-center items-start w-full h-screen `}
      >
        <img src={`/assets/laptop.png`} className={`w-[1000px] object-cover`} />
      </div>
      <div
        className={`flex flex-col justify-center items-start w-full h-screen absolute top-0`}
      >
        <div
          className={`w-[796px] h-[472px] bg-red-400 relative left-[102px] bottom-[15px]`}
        >
          <img src={`/assets/gpt.png`} className={`w-full object-cover`} />
        </div>
      </div>
    </motion.div>
  );
};
