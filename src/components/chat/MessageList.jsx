import MessageBubble from './MessageBubble';

export default function MessageList({ messages, currentUserId, onUserClick }) {
    return (
        <div>
            {messages.map((m) => (
                <MessageBubble
                    key={m.id}
                    message={m}
                    currentUserId={currentUserId}
                    onUserClick={onUserClick}
                />
            ))}
        </div>
    );
}