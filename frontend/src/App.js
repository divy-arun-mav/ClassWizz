// import './App.css';
import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import AdminRegister from './Components/AdminRegister';
import StudentRegister from './Components/StudentRegister';
import TeacherRegister from './Components/TeacherRegister';
import Home from './Components/Home';
import ClassRoom from './Components/ClassRoom';
import Attendance from './Components/Attendance';
import { useAuth } from './Components/store/auth';
import TAttendance from './Components/TAttendance';
import Assignment from './Components/Assignment';
import Manage from './Components/Manage';
import Edit from './Components/Edit';
import Slider from "./Components/Slider"

function App() {
  const { person } = useAuth();
  const [user, setUser] = useState('');

  useEffect(() => {
    const ans = localStorage.getItem('USER');
    setUser(ans ? JSON.parse(ans) : null);
    console.log("PERSON", person);
  }, []);
  
  return (
    <>
      <Routes>
        <Route exact path='/navbar' element={<Navbar />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/attendance' element={<Attendance />} />
        <Route exact path='/tattendance' element={<TAttendance />} />
        <Route exact path='/assignments' element={<Assignment />} />
        <Route exact path='/manage' element={<Manage />} />
        <Route exact path='/edit/:id' element={<Edit />} />
        <Route exact path='/classroom' element={<ClassRoom />} />
        {person === 'Student' && <Route exact path='/studentregister' element={<StudentRegister />} />}
        {person === 'Teacher' && <Route exact path='/teacherregister' element={<TeacherRegister />} />}
        {person === 'Admin' && <Route exact path='/adminregister' element={<AdminRegister />} />}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
