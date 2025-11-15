import './App.css'
import {useState} from "react";
import {Login} from "./login.jsx";
import {Weather} from "./weather.jsx";
import {useAuth} from "./AuthContext.tsx";
import {Route, Routes} from "react-router";

function App() {

    const {
        isLoggedIn,
        username,
        login,
        logout
    } = useAuth();

    return (
        <>
            {isLoggedIn ? <h2>{username}</h2>:<h2>Giriş Yap</h2>}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Weather/>} />
            </Routes>
        </>
    )
}

export default App