import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from './store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function StudentRegister() {
    const {person,storeTokenInLS,backend_api} = useAuth();
    
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [student_id, setStudentId] = useState('');
    const [branch, setBranch] = useState('');
    const [yos, setYos] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password || !mail) {
            return alert("All Fields Are Required!!!");
        }

        if (!emailRegex.test(mail)) {
            alert("Invalid Email");
            return;
        }
        else if (!passRege.test(password)) {
            alert("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
            return;
        }


        try {
            const response = await fetch(`${backend_api}/signup`, {
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
                        yos,
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
                return alert("Username Already Exist!!!");
            }
        }
        catch (error) {
            console.log(error);
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
                            <input type="yos" id="yos" name="yos" value={yos}
                                onChange={(e) => setYos(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <button type="submit">SignUp</button>
                        </div>
                    </form>
                </div>
            </div >
            <style>{`


.container {
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