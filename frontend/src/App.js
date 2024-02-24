import './App.css';
import { toast } from 'react-toastify';
// import { useAuth } from "./store/auth";
// import PrivateRoute from "./user-routes/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import Allocate from './Components/Allocate-class';
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import AdminRegister from './Components/AdminRegister';
import StudentRegister from './Components/StudentRegister';
import TeacherRegister from './Components/TeacherRegister';
import Home from './Components/Home';
import Attendance from './Components/Attendance';


// <Route exact path='/' element={<Home />} />
// <Route exact path='/register' element={<Register />} />
// <Route exact path='/login' element={<Login />} />
// <Route exact path='/forgotpassword' element={<Forgotpassword />} />
// <Route exact path='/newPass' element={<NewPassword />} />
// <Route exact path='/about' element={<About />} />


// <Route exact path="/private" element={<PrivateRoute />} >
//   <Route exact path='logout' element={<Logout />} />
//   <Route exact path="user" element={<Userdashboard />} />
//   <Route exact path="test" element={<Test />} />
//   {user.isAdmin ? <Route exact path='admin' element={<Admin />} /> : <Route exact path='*' element={<Error />} />}
//   <Route exact path='payment' element={<Payment />} />
//   <Route exact path='history' element={<History />} />
//   <Route exact path='qrCode' element={<QrCode />} />
//   <Route exact path='contact' element={<Contact />} />
// </Route>


function App() {
  return (
    <>
      <Routes>
        <Route exact path='/navbar' element={<Navbar />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/attendance' element={<Attendance />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/adminregister' element={<AdminRegister />} />
        <Route exact path='/studentregister' element={<StudentRegister />} />
        <Route exact path='/teacherregister' element={<TeacherRegister />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
