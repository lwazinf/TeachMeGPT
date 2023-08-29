import { faAdd, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

// // // // // // // // Answers_

interface Answers_Props {
    obj_: any
}

export const Answers_ = ({obj_}: Answers_Props) => {
  const textAreaRef = useRef(null);
  const [value_, setValue_] = useState("");

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
  className={`flex flex-col justify-between items-center w-full min-h-[60px] px-4 ${
    value_ ? 'bg-black/5' : 'bg-transparent'
  } rounded-md mb-3 hover:bg-black/20 transition-all duration-500 hover:duration-0 relative`}
>
  <textarea
    ref={textAreaRef}
    value={value_}
    placeholder={`Question ${obj_}: `}
    onChange={handleChange}
    className={`py-1 w-full text-[13px] text-black/50 leading-4 text-left`}
    style={{
      overflow: 'hidden', // To hide scrollbars when not needed
      minHeight: '60px', // Set a minimum height
      maxHeight: '300px', // Set a maximum height if needed
    }}
  />
</div>

  );
};

// // // // // // // // MultiChoice_

interface MultiChoice_Props {
  obj_: any;
}

export const MultiChoice_ = ({ obj_ }: MultiChoice_Props) => {
  const textAreaRef = useRef(null);
  const [value_, setValue_] = useState("");

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
      <p className={`text-[13px] text-black/50`}>Google Sheets</p>
      <FontAwesomeIcon
        icon={obj_ !== 3 ? faArrowRight : faAdd}
        className={`w-[12px] text-black/30 cursor-pointer hover:text-black transition-all duration-200`}
      />
    </div>
  );
};

// // // // // // // // Detail_

interface Detail_Props {}

export const Detail_ = ({}: Detail_Props) => {
  const textAreaRef = useRef(null);
  const [value_, setValue_] = useState("");

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
  className={`flex flex-col justify-between items-center w-full min-h-[60px] px-4 ${
    value_ ? 'bg-black/5' : 'bg-transparent'
  } rounded-md mb-3 hover:bg-black/20 transition-all duration-500 hover:duration-0 relative`}
>
  <textarea
    ref={textAreaRef}
    value={value_}
    placeholder={'Type your answer here..'}
    onChange={handleChange}
    className={`py-1 w-full text-[13px] text-black/50 leading-4 text-left`}
    style={{
      overflow: 'hidden', // To hide scrollbars when not needed
      minHeight: '60px', // Set a minimum height
      maxHeight: '300px', // Set a maximum height if needed
    }}
  />
</div>

  );
};
