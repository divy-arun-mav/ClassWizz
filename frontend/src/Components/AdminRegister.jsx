import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';

export default function AdminRegister() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container ">

                <div className="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="username" id="username" name="username" value={username}
                                onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div >
            <style>{`


.container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 400px;
}

.checkbox-area{
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    width:max-content;
}


.form-header {
    background-color: #4CAF50;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.form-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
}

button {
    background-color: #0d6efd;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
`}</style>
        </>
    )
}