import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    const {person,storeTokenInLS} = useAuth();
    const navigate = useNavigate();
    const [mail, setmail] = useState('');
    const [password, setPassword] = useState('');
    // const notifyA = (msg) => toast.error(msg);
    // const notifyB = (msg) => toast.success(msg);

    // username, password, type

    const handleSubmit = async (e) => {
        e.preventDefault();
         if (!password || !mail) {
            //  return notifyA("All Fields are Required!!!")
             return alert("All Fields are Required!!!")
        }
        try {
            const response = await fetch("http://localhost:8000/signin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password,
                    type:person
                })
            })
            if (response.status === 200) {
                const res_data = await response.json();
                // console.log("response from server ", res_data);
                storeTokenInLS(res_data.token);
                // console.log(isLoggedIn);
                alert("Login Successfull");
                navigate('/');
            }
            else {
                return alert("Invalid Credentials!!!")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container ">

                <div className="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="username">E-mail:</label>
                            <input type="username" id="username" name="username" value={mail}
                                onChange={(e) => setmail(e.target.value)} required />
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
    // background-color: #89CFF0;
    border-radius: 8px;
    margin-top: 12%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 400px;
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