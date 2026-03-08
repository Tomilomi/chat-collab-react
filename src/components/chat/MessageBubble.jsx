const BASE_URL = 'http://localhost:5135';

const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export default function MessageBubble({ message}) {
    //const isOwn = message.sender.id === currentUserId;

    const avatarUrl = message.sender.pictureUrl
        ? `${BASE_URL}${message.sender.pictureUrl}`
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${message.sender.username}`;

    return (
        <div>
            <img src={avatarUrl} alt={message.sender.username} />
            <span>{message.sender.username}</span>
            <p>{message.content}</p>
            <span>{formatTime(message.timestamp)}</span>
        </div>
    );
}