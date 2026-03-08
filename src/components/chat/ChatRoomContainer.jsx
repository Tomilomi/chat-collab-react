import { useState, useEffect } from "react";
import ChatRoom from "./ChatRoom";
import * as chatService from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";

export default function ChatRoomContainer() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { user, token } = useAuth();

  const handleSend = () => {
    chatService.sendMessage(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (!token) return;

    chatService.startConnection(
      token,
      (msgs) => setMessages(msgs),
      (msg) => setMessages((prev) => [...prev, msg]),
    );

    return () => {
      chatService.stopConnection();
    };
  }, [token]);

  return (
    <ChatRoom
      messages={messages}
      currentUserId={user?.id}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onSend={handleSend}
    />
  );
}
