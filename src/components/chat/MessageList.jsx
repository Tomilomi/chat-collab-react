import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';

export default function MessageList({ messages, currentUserId, onUserClick, canDelete }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={styles.list}>
            {messages.map((m) => (
                <MessageBubble
                    key={m.id}
                    message={m}
                    currentUserId={currentUserId}
                    onUserClick={onUserClick}
                    canDelete={canDelete}
                />
            ))}
            <div ref={bottomRef} />
        </div>
    );
}