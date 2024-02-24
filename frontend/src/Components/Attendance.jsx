import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAuth } from './store/auth';
import Navbar from './Navbar';

export default function Attendance() {
    const { token, USER } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);

    const userData = JSON.parse(localStorage.getItem("USER"));
    const uri = `http://localhost:8000/getattendance?student_id=${userData._id}`;

    const getAttendance = async () => {
        try {
            const response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const parsedData = await response.json();
                setAttendanceData(parsedData); // Assuming the API response is an array of data
            } else {
                console.error('Failed to fetch attendance history:', response.status);
            }
        } catch (error) {
            console.log('Error fetching attendance history:', error);
        }
    };

    useEffect(() => {
        getAttendance();
    }, [uri]);

    return (
        <>
            <Navbar />
            <div className='container'>
                <h1>Student Attendance Portal</h1>
                <PieChart
                    series={[
                        {
                            data: attendanceData.map(item => ({
                                id: item.sub_name,  // Assuming sub_name is unique for each subject
                                value: item.presentLec + item.absentLec,
                                label: item.sub_name,
                            })),
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={200}
                />
            </div>

            <style>
                {`
                body{
                    text-align:center;
                }
                .container{
                    margin-top:100px;
                }
                `}
            </style>
        </>
    );
}
