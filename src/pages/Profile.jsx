import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import * as userService from "../services/userService";
import * as pictureService from "../services/pictureService";
import styles from "./Profile.module.css";

const BASE_URL = "http://localhost:5135";

export default function Profile() {
    const { user, token, login } = useAuth();

    const [username, setUsername] = useState(user?.username || "");
    const [password, setPassword] = useState("");
    const [pictures, setPictures] = useState([]);
    const [selectedPictureId, setSelectedPictureId] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        pictureService.getPictures(token).then((res) => {
            setPictures(res.data);
        });
    }, [token]);

    const handleSubmit = async () => {
        try {
            setError("");
            setSuccess("");

            const data = {};
            if (username && username !== user?.username) data.username = username;
            if (password) data.password = password;
            if (selectedPictureId) data.pictureId = selectedPictureId;

            if (Object.keys(data).length === 0) {
                setError("No changes to save.");
                return;
            }

            await userService.updateMe(data, token);

            const me = await userService.getMe(token);
            login(token, me.data);

            setSuccess("Profile updated successfully.");
            setPassword("");
        } catch {
            setError("Something went wrong.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.terminal}>
                <div className={styles.titlebar}>
                    <span className={styles.titlebarText}>PROFILE</span>
                </div>
                <div className={styles.body}>
                    <div className={styles.field}>
                        <label className={styles.label}>username</label>
                        <input
                            className={styles.input}
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>new password</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="leave blank to keep current"
                        />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>avatar</label>
                        <div className={styles.avatarGrid}>
                            {pictures.map((pic) => (
                                <div
                                    key={pic.id}
                                    className={`${styles.avatarOption} ${selectedPictureId === pic.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedPictureId(pic.id)}
                                >
                                    <img src={`${BASE_URL}${pic.url}`} alt="avatar" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className={styles.divider} />
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                    <button className={styles.btn} onClick={handleSubmit}>Save</button>
                    <Link to="/chat" className={styles.link}>back to chat</Link>
                </div>
            </div>
        </div>
    );
}