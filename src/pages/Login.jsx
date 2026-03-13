import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../hooks/useAuth";
import * as authService from "../services/authService";
import * as userService from "../services/userService";
import styles from "./Login.module.css";

Modal.setAppElement("#root");

const QUOTES = [
  "What is a man? A miserable pile of secrets.",
  "It's dangerous to go alone.",
  "Stay a while and listen.",
  "The cake is a lie.",
  "The world ends with you.",
  "You are not alone, and you are not strange. You are just passing through.",
  "Perhaps I've always been hollow.",
  "I can't do this alone... and neither can you.",
  "Is this real... or is it a dream? I can no longer tell.",
  "I hardly know myself anymore.",
  "Whatever you do, don't give up. Even if it's just an ember.",
  "I thought I had purpose, but now I wonder if any of it mattered.",
  "A bottomless curse, a bottomless sea.",
];

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kickedReason = searchParams.get("kicked");
  const canvasRef = useRef(null);

  const quote = useMemo(
    () => QUOTES[Math.floor(Math.random() * QUOTES.length)],
    [],
  );

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < quote.length) {
        setDisplayedText(quote.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [quote]);

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
          : ".",
      ),
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
      const response = await authService.login(username, password);
      const token = response.data.token;
      const me = await userService.getMe(token);
      login(token, me.data);
      navigate("/chat");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <Modal
        isOpen={!!kickedReason}
        onRequestClose={() => navigate("/login")}
        className={styles.kickedModal}
        overlayClassName={styles.kickedOverlay}
      >
        <div className={styles.kickedTitlebar}>
          <span className={styles.kickedTitlebarText}>DISCONNECTED</span>
        </div>
        <div className={styles.kickedBody}>
          <p className={styles.kickedReason}>{kickedReason}</p>
          <button
            className={styles.kickedBtn}
            onClick={() => navigate("/login")}
          >
            Close
          </button>
        </div>
      </Modal>

      <div className={styles.terminal}>
        <div className={styles.titlebar}>
          <span className={styles.titlebarText}>LOGIN</span>
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
          <button className={styles.btn} onClick={handleSubmit}>
            Login
          </button>
          <Link to="/register" className={styles.link}>
            don't have an account? register
          </Link>
        </div>
      </div>

      <div className={styles.note}>
        <div className={styles.noteTitlebar}>
          <span className={styles.noteTitlebarText}>NOTE.txt</span>
        </div>
        <div className={styles.noteBody}>
          <p className={styles.noteQuote}>"{displayedText}"</p>
        </div>
      </div>
    </div>
  );
}
