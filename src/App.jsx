import { Routes, Route, Navigate } from 'react-router-dom'
import ChatRoomContainer from './components/chat/ChatRoomContainer'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './hooks/useAuth'

function App() {
    const { token } = useAuth()

    return (
        <Routes>
            <Route path="/chat" element={token ? <ChatRoomContainer /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}

export default App