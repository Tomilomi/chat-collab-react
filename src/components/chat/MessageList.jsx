import MessageBubble from './MessageBubble';

export default function MessageList({ messages, currentUserId }) {
    return (
        <div>
            {messages.map((m) => (
                <MessageBubble key={m.id} message={m} currentUserId={currentUserId} />
            ))}
        </div>
    );
}