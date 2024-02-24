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

function App() {
  const [user, setUser] = useState(null); // Initialize with null

  let ans;

  useEffect(() => {
    ans = localStorage.getItem('USER');
    setUser(ans ? JSON.parse(ans) : null);
  }, []);

  return (
    <>
      <Routes>
        <Route exact path='/navbar' element={<Navbar user={user} />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        
        <Route exact path='/classroom' element={<ClassRoom />} />
        
        {ans && (
          <>
            {user && user.isStudent && <Route exact path='/studentregister' element={<StudentRegister />} />}
            {user && user.isTeacher && <Route exact path='/teacherregister' element={<TeacherRegister />} />}
            {user && user.isAdmin && <Route exact path='/adminregister' element={<AdminRegister />} />}
          </>
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
