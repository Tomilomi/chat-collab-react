
import MessageBubble from './MessageBubble'

const MessageList = ({ messages = [], currentUserId }) => {
    return (
        <div className="message-list">
            {messages.map((m) => (
                <MessageBubble
                    key={m.id}
                    message={m}
                    currentUserId={currentUserId}
                />
            ))}
        </div>
    )
}

export default MessageList