const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function MessageBubble({ message }) {
    //const isOwn = message.sender.id === currentUserId;

    return (
        <div>
            <span>{message.sender.username}</span>
            <p>{message.content}</p>
            <span>{formatTime(message.timestamp)}</span>
        </div>
    );
}