import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AdminRegister() {
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const {person,storeTokenInLS} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !mail) {
            return alert("All Fields Are Required!!!");
        }
        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    mail,
                    password,
                    type:person
                    }),
            });

            if (response.status === 200) {
                const res_data = await response.json();
                console.log("response from server ", res_data);
                storeTokenInLS(res_data.token);
                alert("Registration Successfull !!!");
                navigate("/login");
            } else {
                return alert("An error occured");
            }
        }
        catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container ">

                <div className="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={mail}
                onChange={(e) => setMail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <button type="submit">SignUp</button>
                        </div>
                    </form>
                </div>
            </div >
            <style>{`

body{
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
}

.container {
    background-color:white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 400px;
    min-width:400px;
}

.checkbox-area{
    display:flex;
    justify-content:center;
    align-items:center;
    text-align:center;
    width:max-content;
    background-color:white;
}


.form-header {
    background-color: white;
    color: #fff;
    padding: 20px;
    text-align: center;
}

.form-body {
    padding: 20px;
    background-color:white
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