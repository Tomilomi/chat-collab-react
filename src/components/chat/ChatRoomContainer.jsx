import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import * as chatService from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";

export default function ChatRoomContainer() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const { user, token, logout } = useAuth();
  const isTyping = useRef(false);
  const navigate = useNavigate();

  const handleSend = () => {
    chatService.sendMessage(inputValue);
    chatService.stopTyping();
    isTyping.current = false;
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value && !isTyping.current) {
      isTyping.current = true;
      chatService.startTyping();
    } else if (!e.target.value) {
      isTyping.current = false;
      chatService.stopTyping();
    }
  };

  const handleLogout = () => {
    chatService.stopConnection();
    logout();
    navigate("/login");
  };

  const handleKicked = useCallback(
    (reason) => {
      chatService.stopConnection();
      logout();
      navigate(`/login?kicked=${encodeURIComponent(reason)}`);
    },
    [logout, navigate],
  );

  useEffect(() => {
    if (!token) return;

    chatService.startConnection(
      token,
      (msgs) => setMessages(msgs),
      (msg) => setMessages((prev) => [...prev, msg]),
      (users) => setConnectedUsers(users),
      (username) => setTypingUsers((prev) => [...prev, username]),
      (username) =>
        setTypingUsers((prev) => prev.filter((u) => u !== username)),
      handleKicked,
    );

    return () => {
      chatService.stopConnection();
    };
  }, [token, handleKicked]);

  return (
    <ChatRoom
      messages={messages}
      currentUserId={user?.id}
      value={inputValue}
      onChange={handleInputChange}
      onSend={handleSend}
      connectedUsers={connectedUsers}
      typingUsers={typingUsers}
      onLogout={handleLogout}
    />
  );
}
