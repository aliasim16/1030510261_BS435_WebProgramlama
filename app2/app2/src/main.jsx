import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./AuthContext.tsx";
import {BrowserRouter} from "react-router-dom";

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
  );
}