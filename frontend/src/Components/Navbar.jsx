import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';
export default function Navbar() {
    // const {} = useAuth();
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const ans = localStorage.getItem("USER");
        setUser(ans ? JSON.parse(ans) : null);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ maxHeight: "50px" }}>
                <div className="container-fluid" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
                    <a className="navbar-brand fs-4 fw-bolder text-primary">EduManager</a>
                    <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Assignments</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Attendance</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>M</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/about'>Schedule</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/private/contact'>Add_Assignment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/private/history'>DashBoard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/private/payment'>Attendance</Link>
                            </li>
                            <li className="nav-item">
                                <select name="" id="">
                                    <option value="Teacher">Teacher</option>
                                    <option value="Student">Student</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </li>
                        </ul>
                        <form className="d-flex fs-6 fw-medium ms-auto">
                            {/* {isLoggedIn ? <>                            <h6 className='my-auto text-primary text-center me-2'>{user.username}</h6> <button className="btn btn-outline-danger ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/private/logout') }}>LogOut</button>
                            </> : <> <button className="btn btn-outline-primary ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/login') }}>Login</button>
                                <button className="btn btn-outline-success ms-2 fw-semibold" type="submit" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/register') }}>SignUp</button></>} */}
                        </form>
                    </div>
                </div>
            </nav>
            <style>{`
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
              }
              li{
                margin-inline: 10px;
              }
              .nav-item select {
                margin-top:10px;
              }
            `}</style>
        </>
    )
}
