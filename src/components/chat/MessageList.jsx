import MessageBubble from './MessageBubble';

export default function MessageList({ messages, currentUserId }) {
    return (
        <div className="flex flex-col">
            {messages.map((m, index) => (
                <div
                    key={m.id}
                    style={{ backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.15)' }}
                    className="p-2 rounded"
                >
                    <MessageBubble message={m} currentUserId={currentUserId} />
                </div>
            ))}
        </div>
    );
}