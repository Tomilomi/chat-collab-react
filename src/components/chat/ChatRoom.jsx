import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatRoom({ messages, currentUserId, value, onChange, onSend }) {
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4">
                <h1 className="text-2xl font-bold">HUB GENERAL</h1>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
                <MessageList messages={messages} currentUserId={currentUserId} />
            </div>

            {/* Message Input */}
            <div className="bg-gray-800 border-t border-gray-700 p-4">
                <MessageInput value={value} onChange={onChange} onSend={onSend} />
            </div>
        </div>
    );
}