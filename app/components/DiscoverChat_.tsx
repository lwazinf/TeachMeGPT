import { faEllipsisH, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface DiscoverChat_Props {
  robot_: boolean;
  data_: any
}

const DiscoverChat_ = ({ robot_, data_ }: DiscoverChat_Props) => {
  const [messages_, setMessages_] = useState([
    { data: "Hi there, how may I be of assistance?", origin: "robot" },
  ]);
  const [tempMessage_, setTempMessage_] = useState("");
  const [chatLoading_, setChatLoading_] = useState(false);

  const handleInputChange = (event) => {
    setTempMessage_(event.target.value);
  };

  useEffect(() => {
    setMessages_([
      { data: "Hi there, how may I be of assistance?", origin: "robot" },
    ])
  }, [data_])

  const handleSendMessage = async () => {
    if (tempMessage_.trim() !== "") {
      setChatLoading_(true);

      // Create a copy of the existing messages
      const updatedMessages = [...messages_];

      // Add the new user message to the copy
      const newMessage = { data: tempMessage_, origin: "user" };
      setTempMessage_("");
      updatedMessages.push(newMessage);

      // Update the state with the user message
      setMessages_(updatedMessages);

      try {
        const robotResponse = await getData(tempMessage_);

        // Create a copy of the existing messages again
        const updatedMessagesWithRobot = [...updatedMessages];

        // Add the robot's message to the copy
        updatedMessagesWithRobot.push({
          data: robotResponse.data,
          origin: robotResponse.origin,
        });

        // Update the state with both user and robot messages
        setMessages_(updatedMessagesWithRobot);
      } catch (error) {
        console.error("Error in fetching robot response:", error);
      } finally {
        setChatLoading_(false);
      }
    }
  };

  const URL = "https://api.openai.com/v1/chat/completions";

  const getData = async (userMessage) => {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            `You are a south african car insurance professional educator. Ask questions on car insurance. Provide evaluation on the answer. use a step by step approach to assist. you do not answer any questions unless its about this particular topic: ${data_[0].topic.extra}. Reject questions unaligned with this.`,
        },
        {
          role: "user",
          content: `${userMessage.trim()}. Keep your answer short`,
        },
      ],
      temperature: 0.9,
    //   stream: true,
    };

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const robotMessage = {
          data: data.choices[0].message.content,
          origin: "robot",
        };
        return robotMessage;
      } else {
        console.error("Failed to fetch data from the API");
        return { data: "An error occurred.", origin: "robot" };
      }
    } catch (error) {
      console.error("Error in fetching data:", error);
      return { data: "An error occurred.", origin: "robot" };
    }
  };

  return (
    <div
      className={`flex flex-row justify-start items-center min-w-[400px] duration-500 h-[600px] bg-black/30 rounded-[8px] relative transition-all overflow-hidden mr-2 ${robot_ ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <img
        className={`h-full w-full object-cover`}
        src={`https://images.pexels.com/photos/2882234/pexels-photo-2882234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
      />
      <div
        className={`w-full h-full flex flex-col justify-end items-center absolute top-0 p-1 bg-black/5 backdrop-blur-sm transition-all duration-200 ${
          robot_ ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`flex flex-col justify-end items-center w-full duration-500 min-h-2 relative transition-all`}
        >
          <div
            className={`w-full min-h-2 relative flex flex-col justify-end items-center`}
          >
            {messages_.map((obj_, index) => (
              <div
                className={`${robot_ ? "mb-1" : "mb-4"} m-2 ${
                  obj_.origin == "robot"
                    ? "mr-auto rounded-md rounded-bl-none bg-white/40 hover:bg-white/90 hover:ml-3"
                    : "ml-auto rounded-md rounded-br-none bg-white/70 hover:bg-white/90 hover:mr-3"
                } cursor-pointer min-w-[100px] min-h-[30px] flex flex-col justify-center items-center text-[13px] text-black/60 transition-all duration-500 px-2 py-2`}
                key={index}
              >
                {obj_.data}
              </div>
            ))}
          </div>
          <div
            className={`min-w-[384px] h-[40px] rounded-[6px] flex flex-row justify-center items-center bg-white/50 backdrop-blur-md m-1 ${
              robot_ ? "mb-1" : "mb-4"
            } transition-all duration-[300ms]`}
          >
            <input
              className={`w-full h-full pl-4 text-[13px] text-black/60`}
              type={`text`}
              maxLength={48}
              disabled={chatLoading_}
              value={tempMessage_}
              onChange={handleInputChange}
            />
            <div
              className={`h-[40px] w-[40px] flex flex-col justify-center items-center rounded-md cursor-pointer hover:text-black/50 text-black/30 ${
                chatLoading_ && "animate-pulse"
              } text-[15px] hover:text-[13px] transition-all duration-200`}
              onClick={() => {
                if (!chatLoading_) {
                  handleSendMessage();
                }
              }}
            >
              <FontAwesomeIcon
                icon={!chatLoading_ ? faPaperPlane : faEllipsisH}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverChat_;
