import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';

export default function MessageList({ messages, currentUserId, onUserClick }) {
    return (
        <div className={styles.list}>
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