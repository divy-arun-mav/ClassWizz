import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';

export default function Navbar({ user }) {
  const { isLoggedIn, LogoutUser, setPerson, person } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-cont">
        <nav style={{ maxHeight: "100%", maxWidth: "100%", backgroundColor: "rgba(255,255,255,0.3)" }} className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand fs-4 fw-bolder" style={{ color: "purple" }}>EduManager</a>
            <button className="navbar-toggler " style={{ "border": "2px solid black" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon "></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-lg-0 fs-5 fw-normal">
                {user && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                    </li>
                    {user.isStudent && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/assignments'>Assignments</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/attendance'>Attendance</Link>
                        </li>
                      </>
                    )}
                    {user.isAdmin && (
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to='/manage'>Manage</Link>
                      </li>
                    )}
                    {user.isTeacher && (
                      <>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/schedule'>Schedule</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/add_assignment'>Add Assignment</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/dashboard'>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to='/attendance'>Attendance</Link>
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
                    <h6 className='my-auto text-primary text-center me-2'></h6>
                    <button className="btn btn-outline-danger ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { LogoutUser(); navigate('/login') }}>Logout</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-outline-primary ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/login') }}>Login</button>
                    {user && user.isStudent && <button className="btn btn-outline-success ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/studentregister') }}>Sign Up</button>}
                    {user && user.isTeacher && <button className="btn btn-outline-success ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/teacherregister') }}>Sign Up</button>}
                    {user && user.isAdmin && <button className="btn btn-outline-success ms-2 fw-semibold" type="button" style={{ maxHeight: "min-content" }} onClick={() => { navigate('/adminregister') }}>Sign Up</button>}
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
