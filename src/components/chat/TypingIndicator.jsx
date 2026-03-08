export default function TypingIndicator({ typingUsers }) {
    if (typingUsers.length === 0) return null;

    return (
        <div>
            <span>
                {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </span>
        </div>
    );
}