import { useState, useEffect } from 'react';
import ChatRoom from './ChatRoom';
import * as chatService from '../../services/chatService';

export default function ChatRoomContainer() {
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState("")

    const handleSend = () => {
        chatService.sendMessage(inputValue)
        setInputValue("")
    }

    useEffect(() => {
        chatService.onLoadMessages((msg) => setMessages(msg))
        chatService.onReceiveMessage((msg) => setMessages((prev) => [...prev, msg]))
        chatService.startConnection()
    }, []);

    return (
        <>
            <ChatRoom
                messages={messages}
                currentUserId={"me"} // cambiar esto despues para cuando llegue el usuario
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={handleSend}
            />
        </>
    )
}
