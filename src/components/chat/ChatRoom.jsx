import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import TypingIndicator from './TypingIndicator';

export default function ChatRoom({ messages, currentUserId, value, onChange, onSend, connectedUsers, typingUsers, onLogout }) {
    return (
        <div>
            <div>
                <p># HUB GENERAL</p>
                <button onClick={onLogout}>Logout</button>
            </div>
            <div>
                <MessageList messages={messages} currentUserId={currentUserId} />
                <UserList connectedUsers={connectedUsers} />
            </div>
            <TypingIndicator typingUsers={typingUsers} />
            <MessageInput value={value} onChange={onChange} onSend={onSend} />
        </div>
    );
}