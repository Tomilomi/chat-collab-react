import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import UserProfileModal from "./UserProfileModal";
import * as chatService from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";

export default function ChatRoomContainer() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, token, logout } = useAuth();
  const isTyping = useRef(false);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!inputValue.trim()) return;
    chatService.sendMessage(inputValue);
    chatService.stopTyping();
    isTyping.current = false;
    setInputValue("");
};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() && !isTyping.current) {
      isTyping.current = true;
      chatService.startTyping();
    } else if (!e.target.value.trim()) {
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

  const handleUserClick = (userData) => {
    setSelectedUser(userData);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!token) return;

    chatService.startConnection(
      token,
      (msgs) => setMessages(msgs),
      (msg) => setMessages((prev) => [...prev, msg]),
      (users) => setConnectedUsers(users),
      (username) =>
        setTypingUsers((prev) =>
          prev.includes(username) ? prev : [...prev, username],
        ),
      (username) =>
        setTypingUsers((prev) => prev.filter((u) => u !== username)),
      handleKicked,
    );

    return () => {
      chatService.stopConnection();
    };
  }, [token, handleKicked]);

  return (
    <>
      <ChatRoom
        messages={messages}
        currentUserId={user?.id}
        value={inputValue}
        onChange={handleInputChange}
        onSend={handleSend}
        connectedUsers={connectedUsers}
        typingUsers={typingUsers}
        onLogout={handleLogout}
        onUserClick={handleUserClick}
      />
      <UserProfileModal
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
        username={selectedUser?.username}
        pictureUrl={selectedUser?.pictureUrl}
        userId={selectedUser?.id}
        canBan={user?.role === "Admin"}
      />
    </>
  );
}
