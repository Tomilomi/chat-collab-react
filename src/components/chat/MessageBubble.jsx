import styles from "./MessageBubble.module.css";

const BASE_URL = "http://localhost:5135";

const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function MessageBubble({ message, currentUserId, onUserClick }) {
    const isOwn = message.sender.id === currentUserId;

    const avatarUrl = message.sender.pictureUrl
        ? `${BASE_URL}${message.sender.pictureUrl}`
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${message.sender.username}`;

    const handleUserClick = () => {
        onUserClick({
            id: message.sender.id,
            username: message.sender.username,
            pictureUrl: message.sender.pictureUrl
        });
    };

    return (
        <div className={`${styles.container} ${isOwn ? styles.own : styles.other}`}>
            <img
                className={styles.avatar}
                src={avatarUrl}
                alt={message.sender.username}
                onClick={handleUserClick}
                style={{ cursor: 'pointer' }}
            />
            <div className={styles.bubble}>
                <span
                    className={styles.username}
                    onClick={handleUserClick}
                    style={{ cursor: 'pointer' }}
                >
                    {message.sender.username}
                </span>
                <p className={styles.content}>{message.content}</p>
                <span className={styles.timestamp}>
                    {formatTime(message.timestamp)}
                </span>
            </div>
        </div>
    );
}