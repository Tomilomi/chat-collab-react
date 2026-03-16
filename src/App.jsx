import { Routes, Route, Navigate } from "react-router-dom";
import CRTEffect from "vault66-crt-effect";
import "vault66-crt-effect/dist/vault66-crt-effect.css";
import ChatRoomContainer from "./components/chat/ChatRoomContainer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useAuth } from "./hooks/useAuth";

function App() {
    const { token } = useAuth();

    return (
        <CRTEffect
            theme="custom"
            scanlineColor="rgba(167, 139, 250, 0.014)"
            enableScanlines={true}
            enableSweep={true}
            sweepDuration={8}
            sweepThickness={2}
            enableGlow={false}
            enableEdgeGlow={true}
            edgeGlowColor="rgba(107, 93, 232, 0.014)"
            edgeGlowSize={120}
            enableFlicker={false}
            flickerIntensity="low"
            enableCurvature={true}
            curvatureAmount={0.15}
        >
            <Routes>
                <Route path="/chat" element={token ? <ChatRoomContainer /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </CRTEffect>
    );
}

export default App;