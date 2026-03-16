import { useState } from "react";
import styles from "./MessageBubble.module.css";
import * as messageService from "../../services/messageService";
import { useAuth } from "../../hooks/useAuth";

const BASE_URL = "http://localhost:5135";

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function MessageBubble({
  message,
  currentUserId,
  onUserClick,
  canDelete,
}) {
  const [hovered, setHovered] = useState(false);
  const { token } = useAuth();

  const isOwn = message.sender.id === currentUserId;

  const avatarUrl = message.sender.pictureUrl
    ? `${BASE_URL}${message.sender.pictureUrl}`
    : `${BASE_URL}/avatars/avatar1.png`;

  const handleUserClick = () => {
    onUserClick({
      id: message.sender.id,
      username: message.sender.username,
      pictureUrl: message.sender.pictureUrl,
    });
  };

  const handleDelete = async () => {
    await messageService.deleteMessage(message.id, token);
  };

  return (
    <div
      className={`${styles.container} ${isOwn ? styles.own : styles.other} ${message.deleting ? styles.deleting : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        className={styles.avatar}
        src={avatarUrl}
        alt={message.sender.username}
        onClick={handleUserClick}
        style={{ cursor: "pointer" }}
      />
      <div className={styles.bubble}>
        <span
          className={styles.username}
          onClick={handleUserClick}
          style={{ cursor: "pointer" }}
        >
          {message.sender.username}
        </span>
        <p className={styles.content}>{message.content}</p>
        <div className={styles.footer}>
          <span className={styles.timestamp}>
            {formatTime(message.timestamp)}
          </span>
          {canDelete && hovered && !message.deleting && (
            <button className={styles.deleteBtn} onClick={handleDelete}>
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
