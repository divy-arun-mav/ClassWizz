import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAuth } from './store/auth';
import Navbar from './Navbar';

const data = [
    { id: 0, value: 20, label: 'Absenties' },
    { id: 1, value: 80, label: 'Presenties' },
];

export default function Attendance() {

    const { token, USER } = useAuth();  

    const [sdate, setSdate] = useState(new Date());
    const [edate, setEdate] = useState(new Date());  

    const data = localStorage.getItem("USER");
    const userData = JSON.parse(data);

    const uri = `http://localhost:8000/getattendance?student_id=${userData._id}`

    const getAttendance = async () => {

        try {
            const attendance = await fetch(uri, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (attendance.status === 200) {
                const parseData = await attendance.json();
                console.log("API Data:", parseData.totalAttendancePercentage);

            } else {
                console.error('Failed to fetch attendance history:', attendance.status);
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
                {/* <PieChart
                series={[
                    {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                height={200}
                /> */}
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
