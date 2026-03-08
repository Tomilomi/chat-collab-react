export default function UserList({ connectedUsers }) {
    return (
        <div>
            <p>Online ({connectedUsers.length})</p>
            {connectedUsers.map((username) => (
                <div key={username}>
                    <span>{username}</span>
                </div>
            ))}
        </div>
    );
}