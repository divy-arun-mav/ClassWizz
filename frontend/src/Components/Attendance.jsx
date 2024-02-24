import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
    { id: 0, value: 20, label: 'Absenties' },
    { id: 1, value: 80, label: 'Presenties' },
];

export default function PieActiveArc() {

    const [sdate, setSdate] = useState(new Date());
    const [edate, setEdate] = useState(new Date());  

    return (
        <>
            <h1>Student Attendance Portal</h1>
            <PieChart
                series={[
                    {
                        data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                height={200}
            />
            
            <style>
                {`
                body{
                    text-align:center;
                }
                `}
            </style>
        </>
    );
}
