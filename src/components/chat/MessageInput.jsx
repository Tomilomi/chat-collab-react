export default function MessageInput({ value, onChange, onSend }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="message-input-container">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="Write a message..."
                className="message-input"
            />
            <button onClick={onSend} className="send-button">
                Send
            </button>
        </div>
    );
}
