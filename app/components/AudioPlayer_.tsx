import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { GenderState } from "./atoms/atoms";

interface AudioPlayer_Props {
    audioSource: any,
    book_: any
}

const AudioPlayer_ = ({audioSource, book_}: AudioPlayer_Props) => {
  const audioRef = useRef(null);
  const [playing_, setPlaying_] = useState(false)
  const [gender_, setGender_] = useRecoilState(GenderState)

  const playAudio = () => {
    audioRef.current?.play();
    setPlaying_(true)
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setPlaying_(false)
  };

    // Use useEffect to update the audio source when the book prop changes
    useEffect(() => {
        if (audioRef.current) {
          audioRef.current.load(); // Reload the audio element
        }
      }, [book_, gender_]);
  return (
    <div className={`mx-2`}>
        <FontAwesomeIcon
                icon={faHeadphones}
                className={`text-[12px] cursor-pointer transition-all duration-200 rounded-[80%] p-[8px] flex flex-row justify-center items-center ${
                    playing_
                      ? "text-white/80 hover:text-black/50 hover:bg-slate-200 bg-black/80"
                      : "text-black/50 hover:text-white/80 bg-slate-200 hover:bg-black/80"
                  }`}
                onClick={() => {
                    if(playing_){
                        pauseAudio()
                    }else{
                        playAudio() 
                    }
                }}
              />
      <audio ref={audioRef} controls={false}>
        {[`${audioSource+book_+'/'+gender_+'/audio.mp3'}`].map((obj_, index) => {
            return <source key={index} src={obj_} type="audio/mpeg" />
        })}
      </audio>
    </div>
  );
};

export default AudioPlayer_;
