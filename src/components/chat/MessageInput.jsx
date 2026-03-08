export default function MessageInput({ value, onChange, onSend }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
            />
            <button onClick={onSend}>Send</button>
        </div>
    );
}