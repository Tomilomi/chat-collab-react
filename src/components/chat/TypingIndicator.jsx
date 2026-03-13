import styles from './TypingIndicator.module.css';

export default function TypingIndicator({ typingUsers }) {
    if (typingUsers.length === 0) return null;

    return (
        <div className={styles.wrapper}>
            <span className={styles.text}>
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing
                <span className={styles.dots} />
            </span>
        </div>
    );
}