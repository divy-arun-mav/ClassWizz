import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from './store/auth';

export default function TAttendance() {
    const [students, setStudents] = useState([]);
    const [attended, setAttended] = useState(false);
    const [type, setType] = useState('present'); // Default to 'present'
    const userData = JSON.parse(localStorage.getItem("USER"));
    const { backend_api } = useAuth();

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${backend_api}/fetchStudents`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.msg);

                if (data.msg) {
                    setStudents(data.msg);
                    setAttended(true);
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    const updateAttendance = async (studentId, attendanceType) => {
        try {
            const response = await fetch(`${backend_api}/putattendance`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    student_id: studentId,
                    sub_name: userData.subject,
                    presentLec: attendanceType === 'present' ? 1 : 0,
                    totalLec: 1,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setType(attendanceType);  // Set type based on the attendanceType
                setAttended(true);  // Set attended to true
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during updating attendance:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <h4 className='text-center m-3'>Attendance</h4>
                <h4 className='text-center m-2'>{userData.subject}</h4>
                <div className="table-responsive mt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Name</th>
                                <th scope="col" className="text-center">SAP ID</th>
                                <th scope="col" className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(students) && students.map((student) => (
                                <tr key={student._id}>
                                    <td className="text-center">{student.username}</td>
                                    <td className="text-center">{student.student_id}</td>
                                    {attended === true ? (<td className='text-center'>
                                        <button className="btn btn-success me-2" type="button" onClick={() => updateAttendance(student.student_id, 'present')}>Present</button>
                                        <button className="btn btn-danger ms-2" type="button" onClick={() => updateAttendance(student.student_id, 'absent')}>Absent</button>
                                    </td>) : <p>{type}</p>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <style>{`
                    body {
                        margin-top: 100px;
                    }
                `}</style>
            </div>
        </>
    );
}
