import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/authService";
import styles from "./Login.module.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const TILE = 20;
        const COLS = Math.ceil(canvas.width / TILE);
        const ROWS = Math.ceil(canvas.height / TILE);
        const CHARS = ["#", ".", "+", "@", "%", "~", "!", "?", "-", "|"];

        const map = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () =>
                Math.random() < 0.3
                    ? CHARS[Math.floor(Math.random() * CHARS.length)]
                    : "."
            )
        );

        ctx.font = `${TILE * 0.7}px monospace`;
        ctx.fillStyle = "#c084fc";

        let frame = 0;
        let animId;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    const char = map[r][c];
                    const flicker = Math.sin(frame * 0.02 + r * 0.5 + c * 0.3) > 0.97;
                    ctx.globalAlpha = flicker ? 0.6 : 0.3;
                    ctx.fillText(char, c * TILE, r * TILE);
                }
            }
            frame++;
            animId = requestAnimationFrame(draw);
        };

        animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, []);

    const handleSubmit = async () => {
        try {
            await authService.register(username, password);
            navigate("/login");
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.canvas} />

            <div className={styles.terminal}>
                <div className={styles.titlebar}>
                    <span className={styles.titlebarText}>REGISTER</span>
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
                        <label className={styles.label}>password</label>
                        <input
                            className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <hr className={styles.divider} />
                    <button className={styles.btn} onClick={handleSubmit}>Register</button>
                    <Link to="/login" className={styles.link}>already have an account? login</Link>
                </div>
            </div>
        </div>
    );
}