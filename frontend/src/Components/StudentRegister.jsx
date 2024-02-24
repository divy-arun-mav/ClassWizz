import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function StudentRegister() {
    const {person,storeTokenInLS} = useAuth();
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [student_id, setStudentId] = useState('');
    const [branch, setBranch] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username,password,mail);
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
                        student_id,
                        branch,
                        type:person
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


    const [pass, setPass] = useState('');
    return (
        <>
            <Navbar />
            <div className="container ">

                <div className="form-body">
                    <form id="registerForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
                            <label for="student-id">Student ID:</label>
                            <input type="student-id" id="student-id" name="student-id" value={student_id}
                                onChange={(e) => setStudentId(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="branch">Branch:</label>
                            <input type="branch" id="branch" name="branch" value={branch}
                                onChange={(e) => setBranch(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label for="yos">Year Of Study:</label>
                            <input type="yos" id="yos" name="yos" value={pass}
                                onChange={(e) => setPass(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <button type="submit">SignUp</button>
                        </div>
                    </form>
                </div>
            </div >
            <style>{`


.container {
    background-color: #89CFF0;
    margin-top:8%;
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
    width:100%;
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
    margin:20px 0;
}

button:hover {
    background-color: #45a049;
}
`}</style>
        </>
    )
}