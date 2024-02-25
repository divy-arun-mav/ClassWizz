import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';
import logo from "../assets/Logo.png";

export default function Navbar({ user }) {
    const { isLoggedIn, LogoutUser, setPerson, person } = useAuth();
    const navigate = useNavigate();

    const data = localStorage.getItem("USER");
    const userData = JSON.parse(data);

    return (
        <>
            <div className="nav-cont">
                <nav style={{ maxWidth: "100%", backgroundColor: "rgba(255,255,255,0.3)" }} className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand fs-4 fw-bolder" style={{ color: "purple" }} to='/'>
                            <img src={logo} alt="logo" className='logo' id="logo" />
                        </Link>
                        <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                                </li>
                                {userData && (
                                    <>
                                        {userData.isStudent && (
                                            <>
                                               
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to='/attendance'>Attendance</Link>
                                                </li>
                                            </>
                                        )}
                                        {userData.isAdmin && (
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to='/manage'>Manage</Link>
                                            </li>
                                        )}
                                        {userData.isTeacher && (
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to='/assignments'>BroadCast</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to='/dashboard'>Dashboard</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link active" aria-current="page" to='/tattendance'>Attendance</Link>
                                                </li>
                                            </>
                                        )}
                                    </>
                                )}
                                <li className="nav-item">
                                    <select value={person} onChange={(e) => { setPerson(e.target.value) }}>
                                        <option value="Teacher">Teacher</option>
                                        <option value="Student">Student</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </li>
                            </ul>
                            <form className="d-flex fs-6 fw-medium ms-auto">
                                {isLoggedIn ? (
                                    <>
                                       
                                        <button className="btn btn-outline-danger ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { LogoutUser(); navigate('/login') }}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-outline-primary ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/login') }}>Login</button>
                                            <button className="btn btn-outline-success ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => {
                                                person === "Student" ? navigate('/studentregister') : person === "Teacher" ? navigate('/teacherregister') : navigate('/adminregister')
                                            }}>Sign Up</button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body {
          width: 100%;
          overflow-x: hidden;
          z-index: 1;
        }
        .nav-cont {
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
        }
        .logo{
            width:200px;
        }
        li {
          margin-inline: 10px;
        }
        .nav-item select {
          margin-top: 10px;
        }
      `}</style>
        </>
    );
}
