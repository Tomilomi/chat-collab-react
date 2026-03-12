import styles from "./MessageBubble.module.css";

const BASE_URL = "http://localhost:5135";

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MessageBubble({ message, currentUserId }) {
  const isOwn = message.sender.id === currentUserId;

  const avatarUrl = message.sender.pictureUrl
    ? `${BASE_URL}${message.sender.pictureUrl}`
    : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${message.sender.username}`;

  return (
    <div className={`${styles.container} ${isOwn ? styles.own : styles.other}`}>
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={message.sender.username}
      />
      <div className={styles.bubble}>
        <span className={styles.username}>{message.sender.username}</span>
        <p className={styles.content}>{message.content}</p>
        <span className={styles.timestamp}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
