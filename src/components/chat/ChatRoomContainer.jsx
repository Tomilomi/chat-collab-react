import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import UserProfileModal from "./UserProfileModal";
import * as chatService from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";
import { useSignalR } from "../../hooks/useSignalR";
import { useState } from "react";

export default function ChatRoomContainer() {
    const { messages, connectedUsers, typingUsers } = useSignalR();
    const [inputValue, setInputValue] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const { user, logout } = useAuth();
    const isTyping = useRef(false);
    const navigate = useNavigate();

    const canDelete = user?.role === "Admin" || user?.role === "Moderator";

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

    const handleUserClick = (userData) => {
        setSelectedUser(userData);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

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
                canDelete={canDelete}
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