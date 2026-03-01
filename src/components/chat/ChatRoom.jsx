import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatRoom({ messages, currentUserId, value, onChange, onSend }) {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center p-2 sm:p-4" style={{ backgroundColor: '#6b5de8' }}>
            <div className="nes-container is-rounded with-title w-full h-full max-w-4xl flex flex-col space-y-2" style={{ backgroundColor: '#5448d0' }}>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-6">
                    <MessageList messages={messages} currentUserId={currentUserId} />
                </div>

                {/* Message Input */}
                <MessageInput value={value} onChange={onChange} onSend={onSend} />

            </div>
        </div>
    );
}