import { useEffect, useRef, useCallback } from 'react';
import MessageBubble from './MessageBubble';
import styles from './MessageList.module.css';
import { useSignalR } from '../../hooks/useSignalR';

export default function MessageList({ messages, currentUserId, onUserClick, canDelete }) {
    const bottomRef = useRef(null);
    const listRef = useRef(null);
    const { hasMore, loadMore } = useSignalR();
    const isLoadingMore = useRef(false);

    useEffect(() => {
        if (!isLoadingMore.current) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        isLoadingMore.current = false;
    }, [messages]);

    const handleScroll = useCallback(() => {
        if (!listRef.current) return;
        if (listRef.current.scrollTop === 0 && hasMore) {
            isLoadingMore.current = true;
            const prevHeight = listRef.current.scrollHeight;
            loadMore();
            requestAnimationFrame(() => {
                if (listRef.current) {
                    listRef.current.scrollTop = listRef.current.scrollHeight - prevHeight;
                }
            });
        }
    }, [hasMore, loadMore]);

    return (
        <div className={styles.list} ref={listRef} onScroll={handleScroll}>
            {hasMore && (
                <div className={styles.loadMore} onClick={loadMore}>
                    load more messages
                </div>
            )}
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