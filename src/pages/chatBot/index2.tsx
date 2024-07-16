import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any>([]);

  // Hàm gửi yêu cầu POST để nhận dữ liệu text
  const sendMessage = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://api.coze.com/open_api/v2/chat",
        headers: {
          Authorization:
            "Bearer pat_1lk3SAh5l3d5qjy8pyZns8czFtujBmJzzilGXpURmH8x335yWdyl9IjkLKX8qEmi",
          "Content-Type": "application/json",
        },
        data: {
          conversation_id: "123",
          bot_id: "7360524403228262407",
          user: "29032201862555",
          query: query,
          stream: true,
        },
      });

      // Xử lý dữ liệu text
      setMessages([...messages, response.data]);
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg: any, index: number) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatBot;
