import React, { useEffect, useState } from 'react'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

export default function TeacherRegister() {
    const navigate = useNavigate();
    const {person,storeTokenInLS} = useAuth();
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [teacher_id, setTeacherId] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !mail) {
            return notifyA("All Fields Are Required!!!");
        }

        try {
            const response = await fetch("http://localhost:8000/signup", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    mail,
                    subject,
                    teacher_id,
                    person
                }),
            });

            if (response.status === 200) {
                const res_data = await response.json();
                console.log("response from server ", res_data);
                storeTokenInLS(res_data.token);
                notifyB("Registration Successfull !!!");
                navigate("/login");
            } else {
                return notifyA("Username Already Exist!!!");
            }
        }
        catch (error) {
            notifyA(error);
        }
    };


    return (
        <>
            <Navbar/>
            <div className="container ">

                <div className="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" value={mail}
                                onChange={(e) => setMail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="student-id">Teacher ID:</label>
                            <input type="student-id" id="student-id" name="student-id" value={teacher_id}
                                onChange={(e) => setTeacherId(e.target.value)} required />
                        </div>
                        
                        <div className="form-group">
                            <label for="yos">Subject:</label>
                            <input type="yos" id="yos" name="yos" value={subject}
                                onChange={(e) => setSubject(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <button type="submit">SignUp</button>
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