
function MessageBubble({ message, currentUserId }) {
    const isOwn = message.sender.id === currentUserId

    return (
        <div className={`message-bubble ${isOwn ? 'user' : 'other'}`}>

            <div className={`bublename ${isOwn ? 'user-name' : 'other-name'}`}>
                {message.sender.username}
            </div>
            <div className={`bubble ${isOwn ? 'user-bubble' : 'other-bubble'}`}>
                {message.content}
            </div>
            <div className={`bubbletimestamp ${isOwn ? 'user-timestamp' : 'other-timestamp'}`}>
                {message.timestamp}
            </div>
        </div>
    );
};
// ver bien los dto 
// formatear el timestamp
export default MessageBubble;

