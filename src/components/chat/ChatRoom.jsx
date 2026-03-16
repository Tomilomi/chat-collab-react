import { useNavigate } from 'react-router-dom';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import TypingIndicator from './TypingIndicator';
import styles from './ChatRoom.module.css';

export default function ChatRoom({ messages, currentUserId, value, onChange, onSend, connectedUsers, typingUsers, onLogout, onUserClick, canDelete }) {
    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span className={styles.title}># HUB GENERAL</span>
                <div className={styles.headerButtons}>
                    <button className={styles.btnProfile} onClick={() => navigate('/profile')}>Profile</button>
                    <button className={styles.btnLogout} onClick={onLogout}>Logout</button>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.messagesArea}>
                    <MessageList messages={messages} currentUserId={currentUserId} onUserClick={onUserClick} canDelete={canDelete} />
                    <TypingIndicator typingUsers={typingUsers} />
                    <MessageInput value={value} onChange={onChange} onSend={onSend} />
                </div>
                <div className={styles.sidebar}>
                    <UserList connectedUsers={connectedUsers} />
                </div>
            </div>
        </div>
    );
}