import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Allocate from './Components/Allocate-class';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import AdminRegister from './Components/AdminRegister';
import StudentRegister from './Components/StudentRegister';
import TeacherRegister from './Components/TeacherRegister';
import Home from './Components/Home';
import ClassRoom from './Components/ClassRoom';
import { useState, useEffect } from 'react';
import Attendance from './Components/Attendance';
import { useAuth } from './Components/store/auth';

function App() {
  const { person } = useAuth();
  const [user, setUser] = useState('');

  let ans;
  useEffect(() => {
    ans = localStorage.getItem('USER');
    setUser(ans ? JSON.parse(ans) : null);
  }, []);
  console.log("FROM APP.JS: ",person);

  return (
    <>
      <Routes>
        <Route exact path='/navbar' element={<Navbar user={user} />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/attendance' element={<Attendance />} />

        <Route exact path='/classroom' element={<ClassRoom />} />
        <Route exact path='/studentregister' element={<StudentRegister />} />
        <Route exact path='/teacherregister' element={<TeacherRegister />} />
        <Route exact path='/adminregister' element={<AdminRegister />} />
        
        { person==="Student" && <Route exact path='/studentregister' element={<StudentRegister />} />}
        { person==="Teacher" && <Route exact path='/teacherregister' element={<TeacherRegister />} />}
        { person==="Admin" && <Route exact path='/adminregister' element={<AdminRegister />} />}


      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
