import Modal from "react-modal";
import * as userService from "../../services/userService";
import * as chatService from "../../services/chatService";
import { useAuth } from "../../hooks/useAuth";
import styles from "./UserProfileModal.module.css";
import { BASE_URL } from "../../config";

Modal.setAppElement("#root");

export default function UserProfileModal({ username, pictureUrl, userId, isOpen, onClose, canBan }) {
    const { token } = useAuth();


    const handleBan = async () => {
        await userService.banUser(userId, token);
        onClose();
    };

    const handleKick = () => {
        chatService.kickUser(userId);
        onClose();
    };

    const avatarUrl = pictureUrl
        ? `${BASE_URL}${pictureUrl}`
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.titlebar}>
                <span className={styles.titlebarText}>INFO</span>

            </div>
            <div className={styles.body}>
                <div className={styles.avatarWrapper}>
                    <img className={styles.avatar} src={avatarUrl} alt={username} />
                </div>
                <span className={styles.username}>{username}</span>
                <hr className={styles.divider} />
                <div className={styles.buttons}>
                    {canBan && (
                        <>
                            <button className={styles.btnKick} onClick={handleKick}>Kick</button>
                            <button className={styles.btnBan} onClick={handleBan}>Ban</button>
                        </>
                    )}
                    <button className={styles.btnClose} onClick={onClose}>Close</button>
                </div>
            </div>
        </Modal>
    );
}