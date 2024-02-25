import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useAuth } from './store/auth';
import Navbar from './Navbar';

export const options = {
    title: "Student Attendance Portal",
};

export default function Attendance() {



    const { token } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const userData = JSON.parse(localStorage.getItem("USER"));

    const getAttendance = async () => {
        try {
            const response = await fetch('http://localhost:8000/getattendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    student_id: 123,  // Replace with the actual student_id
                }),
            });

            if (response.status === 200) {
                const parsedData = await response.json();
                setAttendanceData(parsedData); 
            } else {
                console.error('Failed to fetch attendance history:', response.status);
            }
        } catch (error) {
            console.log('Error fetching attendance history:', error);
        }
    };

    useEffect(() => {
        getAttendance();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <h1>Student Attendance Portal</h1>
                {attendanceData.length > 0 ? (
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={[
                                ['Subject', 'Attendance'],
                                ...attendanceData.map(item => [item.sub_name, item.presentLec + item.absentLec]),
                            ]}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                        <p>Data available, chart should be visible</p>
                    </div>
                ) : (
                    <p>No attendance data available</p>
                )}
            </div>
            <style>
                {`
                body {
                    text-align: center;
                }
                .container {
                    margin-top: 100px;
                }
                `}
            </style>
        </>
    );
}
