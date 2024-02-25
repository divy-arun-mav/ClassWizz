import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from './store/auth';

export default function Assignment() {
    const [branch, setBranch] = useState('');
    const [msg, setMsg] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const { backend_api } = useAuth();

    const sendMail = async () => {
        // Use the selectedBranch state variable in your fetch request or any other logic
        console.log('Selected Branch:', selectedBranch);

        const ans = await fetch(`${backend_api}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                msg,
                branch: selectedBranch,
            }),
        });

    if (ans.ok) {
        alert("Message Sent Successfully");
        setBranch('');
        setMsg('');
    } else {
        console.error('Error:', ans.statusText);
    }
}

return (
    <>
        <Navbar />
        <div className="container col-6 mt-5">
            <div className="input-group mb-3">
                <div className="btn-group" id="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {selectedBranch ? selectedBranch : 'Select Branch'}
                    </button>
                    <div className="dropdown-menu custom-width" id="drop" style={{ width: '300px' }}>
                        <Link to="#" className="dropdown-item" onClick={() => setSelectedBranch('CSE')}>CSE</Link>
                        <Link to="#" className="dropdown-item" onClick={() => setSelectedBranch('ICB')}>ICB</Link>
                        <Link to="#" className="dropdown-item" onClick={() => setSelectedBranch('DS')}>DS</Link>
                        <Link to="#" className="dropdown-item" onClick={() => setSelectedBranch('IT')}>IT</Link>
                    </div>
                </div>
            </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter Message" aria-label="Recipient's username" aria-describedby="basic-addon2" value={msg} onChange={(e) => { setMsg(e.target.value) }} />
            </div>
            <div className='text-center'>
                <button className='btn btn-primary' onClick={sendMail}>Send Mail</button>
            </div>
        </div>
        <style>
            {`
                body {
                    margin-top: 100px;
                }

                .custom-width {
                    width: 300px;
                }
                `}
        </style>
    </>
)
}