import Modal from 'react-modal';
import * as userService from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

Modal.setAppElement('#root');

export default function UserProfileModal({ username, pictureUrl, userId, isOpen, onClose, canBan }) {
    const { token } = useAuth();
    const BASE_URL = 'http://localhost:5135';

    const handleBan = async () => {
        await userService.banUser(userId, token);
        onClose();
    };

    const avatarUrl = pictureUrl
        ? `${BASE_URL}${pictureUrl}`
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <img src={avatarUrl} alt={username} />
            <h2>{username}</h2>
            {canBan && (
                <button onClick={handleBan}>Banear</button>
            )}
            <button onClick={onClose}>Cerrar</button>
        </Modal>
    );
}