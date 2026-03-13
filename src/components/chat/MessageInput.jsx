import styles from './MessageInput.module.css';

export default function MessageInput({ value, onChange, onSend }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="> type your message..."
            />
            <button className={styles.btn} onClick={onSend}>Send</button>
        </div>
    );
}