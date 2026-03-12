import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../hooks/useAuth";
import * as authService from "../services/authService";
import * as userService from "../services/userService";

Modal.setAppElement("#root");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const kickedReason = searchParams.get("kicked");

  const handleSubmit = async () => {
    const response = await authService.login(username, password);
    const token = response.data.token;
    const me = await userService.getMe(token);
    login(token, me.data);
    navigate("/chat");
  };

  return (
    <div>
      <Modal isOpen={!!kickedReason} onRequestClose={() => navigate("/login")}>
        <h2>Fuiste expulsado</h2>
        <p>{kickedReason}</p>
        <button onClick={() => navigate("/login")}>Cerrar</button>
      </Modal>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
