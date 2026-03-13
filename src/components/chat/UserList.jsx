import { useState } from 'react';
import styles from './UserList.module.css';

export default function UserList({ connectedUsers }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={`${styles.wrapper} ${collapsed ? styles.collapsed : ''}`}>
            <div className={styles.titlebar} onClick={() => setCollapsed(!collapsed)}>
                <span className={styles.titlebarText}>ONLINE ({connectedUsers.length})</span>
                <span className={styles.toggle}>{collapsed ? '+' : '-'}</span>
            </div>
            {!collapsed && (
                <div className={styles.list}>
                    {connectedUsers.map((username) => (
                        <div key={username} className={styles.user}>
                            <div className={styles.dot} />
                            <span className={styles.username}>{username}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}