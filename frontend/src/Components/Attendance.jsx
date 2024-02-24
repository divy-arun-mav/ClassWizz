import React from 'react'

const Attendance = () => {
    const data = {
        labels: [
            'Present',
            'Absent'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [80, 20],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    return (
        <div>Attendance</div>
    )
}

export default Attendance