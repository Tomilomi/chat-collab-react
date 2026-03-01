export default function MessageBubble({ message, currentUserId }) {
    const isOwn = message.sender.id === currentUserId;

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const Avatar = () => (
        <div className="flex flex-col items-center">
            <img
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${message.sender.username}`}
                alt="avatar"
                className="w-8 h-8"
            />
            <span className="text-xs mt-1">{message.sender.username}</span>
        </div>
    );

    return (
        <div className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>

            {!isOwn && <Avatar />}

            <div className={`nes-balloon ${isOwn ? 'from-right' : 'from-left'} is-dark`}>
                <p className="nes-text text-black">{message.content}</p>
                <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
            </div>

            {isOwn && <Avatar />}

        </div>
    );
}