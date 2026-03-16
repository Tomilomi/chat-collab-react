import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SignalRContext } from "./SignalRContext";
import * as chatService from "../services/chatService";
import { useAuth } from "../hooks/useAuth";

export function SignalRProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const { token, logout } = useAuth();
  const navigate = useNavigate();

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
      (username) =>
        setTypingUsers((prev) =>
          prev.includes(username) ? prev : [...prev, username],
        ),
      (username) =>
        setTypingUsers((prev) => prev.filter((u) => u !== username)),
      handleKicked,
      (messageId) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, deleting: true } : m)),
        );
        setTimeout(() => {
          setMessages((prev) => prev.filter((m) => m.id !== messageId));
        }, 600);
      },
      (updatedUser) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.sender.id === updatedUser.userId
              ? {
                  ...m,
                  sender: {
                    id: m.sender.id,
                    username: updatedUser.username ?? m.sender.username,
                    pictureUrl: updatedUser.pictureUrl ?? m.sender.pictureUrl,
                  },
                }
              : m,
          ),
        );
      },
    );

    return () => {
      chatService.stopConnection();
    };
  }, [token, handleKicked]);

  return (
    <SignalRContext.Provider
      value={{ messages, setMessages, connectedUsers, typingUsers }}
    >
      {children}
    </SignalRContext.Provider>
  );
}
