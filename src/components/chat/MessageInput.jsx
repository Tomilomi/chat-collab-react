export default function MessageInput({ value, onChange, onSend }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="nes-field flex gap-2 p-2 rounded-lg">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="nes-input flex-1"
            />
            <button
                type="button"
                onClick={onSend}
                className="nes-btn is-primary"
            >
                Send
            </button>
        </div>
    );
}