import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { SignalRProvider } from './context/SignalRProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <SignalRProvider>
                    <App />
                </SignalRProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)