import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatRoom({ messages, currentUserId, value, onChange, onSend }) {
    return (
        <div>
            <p># HUB GENERAL</p>
            <div>
                <MessageList messages={messages} currentUserId={currentUserId} />
            </div>
            <MessageInput value={value} onChange={onChange} onSend={onSend} />
        </div>
    );
}