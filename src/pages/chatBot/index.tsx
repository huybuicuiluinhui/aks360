import React, { useState } from "react";
import Images from "../../static";
import Header from "../../component/header";
import axios from "axios";
import Loading from "../../component/loading";
import { useAuth } from "../../context/authContext";
import { API_URL_IMAGE } from "../../utils/contanst";
interface IMessage {
  role: "user" | "bot";
  content: string;
}
const ChatBot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>(() => {
    const savedMessages = localStorage.getItem(
      user?.phone_kiotviet || "messages"
    ); // Sử dụng phone_kiotviet làm key
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [query, setQuery] = useState<string>(""); // State cho input người dùng nhập
  const [loading, setLoading] = useState<boolean>(false);
  const handleSend = async () => {
    if (query.length === 0) {
      return;
    } else {
      setQuery(""); // Xóa trường nhập sau khi gửi
      setLoading(true);
      // Lưu tin nhắn người dùng vào state
      const userMessage: IMessage = {
        role: "user",
        content: query,
      };
      // setMessages([...messages, userMessage]);
      setMessages((oldMessages) => {
        const updatedMessages = [...oldMessages, userMessage];
        localStorage.setItem(
          user?.phone_kiotviet || "messages",
          JSON.stringify(updatedMessages)
        ); // Sử dụng phone_kiotviet làm key
        return updatedMessages;
      });
      // Gửi yêu cầu tới API và nhận dữ liệu
      try {
        const response = await axios.post(
          "https://api.coze.com/open_api/v2/chat",
          {
            conversation_id: `${user}`,
            bot_id: "7360524403228262407",
            user: `${user}`,
            query: query,
            stream: false,
          },
          {
            headers: {
              Authorization:
                "Bearer pat_1lk3SAh5l3d5qjy8pyZns8czFtujBmJzzilGXpURmH8x335yWdyl9IjkLKX8qEmi",
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response.data", response);
        // Lưu tin nhắn từ chatbot vào state
        const botMessage = response.data.messages.find(
          (msg: any) => msg.type === "answer"
        );
        if (botMessage) {
          setMessages((oldMessages: any) => {
            const updatedMessages = [
              ...oldMessages,
              { role: "bot", content: botMessage.content },
            ];
            localStorage.setItem(
              user?.phone_kiotviet || "messages",
              JSON.stringify(updatedMessages)
            );
            return updatedMessages;
          });
        }
      } catch (error) {
        console.error("Error while sending message:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleClearChat = () => {
    // Xóa tin nhắn từ localStorage
    localStorage.removeItem(user?.phone_kiotviet || "messages");
    // Xóa tin nhắn từ state
    setMessages([]);
  };
  return (
    <div className="w-full h-full ">
      <Header title="Chat bot" />
      <div
        className={`   bg-[#cbf0b9] bg-cover bg-center  w-screen flex flex-col min-h-screen  flex-1  pt-4 px-2 pb-32`}
      >
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div className="flex  items-start gap-4 " key={index}>
              <img
                src={API_URL_IMAGE + user?.avavtar}
                alt=""
                className="w-[38px] h-[38px] rounded-full  "
              />
              <div className="bg-gradient-to-r from-[#3669C9] to-[#1A9EC8] px-2  rounded-xl py-2">
                <p className="text-white text-sm ">{msg.content}</p>
              </div>
            </div>
          ) : (
            <div
              className="flex justify-end items-start gap-4  py-5"
              key={index}
            >
              <div className="bg-white px-2  rounded-xl py-2">
                <p className="text-[#4D53E8] text-sm ">
                  {msg.content.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <img
                src={Images.logoBaTot}
                alt=""
                className="w-[38px] h-[38px] rounded-full  "
              />
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-end items-start gap-4 my-5">
            <Loading />
          </div>
        )}
        {/* {messages.length > 0 && (
          <p
            className="text-sm text-center font-medium underline"
            onClick={handleClearChat}
          >
            Xóa
          </p>
        )} */}
      </div>
      <div className="h-20 bg-[#cbf0b9] w-full fixed bottom-[0%] px-2 flex items-center justify-center">
        <div className="bg-white w-[90%]  flex rounded-md border-[0.5px] border-gray">
          <input
            type="text"
            className="flex flex-1 bg-white py-0 px-2  rounded-md focus:outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => {
              if (loading === true) {
                return;
              } else {
                handleSend();
              }
            }}
          >
            <img
              src={Images.iconSendMes}
              alt=""
              className="w-[32px] h-[32px] object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
