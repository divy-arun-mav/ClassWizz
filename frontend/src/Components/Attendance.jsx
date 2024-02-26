import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useAuth } from './store/auth';
import Navbar from './Navbar';

export const options = {
    title: "Student Attendance Portal",
};

export default function Attendance() {
    const { token, backend_api } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const [subjectWiseAttendance, setSubjectWiseAttendance] = useState({});
    const [totalAttendancePercentage, setTotalAttendancePercentage] = useState("");
    const userData = JSON.parse(localStorage.getItem("USER"));

    const getAttendance = async () => {
        try {
            const response = await fetch(`${backend_api}/getattendance`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const parsedData = await response.json();
                console.log(parsedData);
                setAttendanceData(parsedData.attendanceData);
                setSubjectWiseAttendance(parsedData.subjectWiseAttendance);
                setTotalAttendancePercentage(parsedData.totalAttendancePercentage);
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
                        <h2>Subject-wise Attendance</h2>
                        <Chart
                            chartType="PieChart"
                            data={[
                                ['Subject', 'Attendance'],
                                ...attendanceData.map(item => [item.sub_name, item.presentLec]),
                            ]}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />
                        <h2>Total Attendance Percentage</h2>
                        <Chart
                            chartType="PieChart"
                            data={[
                                ['Attendance', 'Percentage'],
                                ['Present', parseFloat(totalAttendancePercentage)],
                                ['Absent', 100 - parseFloat(totalAttendancePercentage)],
                            ]}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                        />

                        <p>Data available, charts should be visible</p>
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
