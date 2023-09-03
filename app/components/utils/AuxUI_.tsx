import { faAdd, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { AnswerState } from "../atoms/atoms";

// // // // // // // // MultiChoice_

interface MultiChoice_Props {
  obj_: any;
}

export const MultiChoice_ = ({ obj_ }: MultiChoice_Props) => {
  const textAreaRef = useRef(null);
  const [value_, setValue_] = useState("");
  const [selectedA_, setSelectedA_] = useRecoilState(AnswerState)

  const handleChange = (e: any) => {
    setValue_(e.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      // @ts-ignore
      textAreaRef.current.style.height = "auto";
      // @ts-ignore
      textAreaRef.current.style.height =
        // @ts-ignore
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value_]);
  return (
    <div
      className={`flex flex-row justify-between items-center w-full h-[60px] px-4 bg-black/5 rounded-md mb-3 hover:bg-black/20 hover:px-5 cursor-pointer transition-all duration-500 hover:duration-0`}
    >
      <p className={`text-[13px] text-black/50`}>Option</p>
      <FontAwesomeIcon
        icon={faArrowRight}
        className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200`}
      />
    </div>
  );
};

// // // // // // // // Detail_

interface Detail_Props {
  data: any,
  trigger: boolean
}

export const Detail_ = ({data, trigger}: Detail_Props) => {
  const textAreaRef = useRef(null);
  const [value_, setValue_] = useState("");
  const [selectedA_, setSelectedA_] = useRecoilState(AnswerState)

  const handleChange = (e: any) => {
    setValue_(e);
    if(e.length == 0){
      setSelectedA_({data: '', answer: ''});
    }else{
      setSelectedA_({data: `${data.index} - ${data.Q}`, answer: e});
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      // @ts-ignore
      textAreaRef.current.style.height = "auto";
      // @ts-ignore
      textAreaRef.current.style.height =
        // @ts-ignore
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value_]);

  useEffect(() => {
    setValue_('')
  }, [trigger])
  return (
    <div
  className={`flex flex-col justify-between items-center w-full min-h-[60px] px-4 ${
    value_ ? 'bg-black/10' : 'bg-transparent'
  } rounded-md mb-3 hover:bg-black/5 transition-all duration-500 hover:duration-0 relative`}
>
<textarea
    ref={textAreaRef}
    value={value_}
    placeholder={`Type your answer here..`}
    onChange={(obj__) => {
      handleChange(obj__.target.value)
    }}
    className={`py-1 w-full text-[13px] text-black/50 leading-4 text-left`}
    style={{
      overflow: 'hidden', // To hide scrollbars when not needed
      minHeight: '70px', // Set a minimum height
      maxHeight: '300px', // Set a maximum height if needed
    }}
  />
</div>

  );
};
