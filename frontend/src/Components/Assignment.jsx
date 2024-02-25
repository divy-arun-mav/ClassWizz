import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Assignment() {
    const [mail,setmail] = useState('');
    const [branch,setBranch] = useState('');
    const [msg,setMsg] = useState('');
    useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("USER"));
    setmail(userData.mail);
    },[])
    
    const sendMail = async (id) => {
        const ans = await fetch(`http://localhost:8000/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                msg,
                branch,
                mail
            })
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
                    <label htmlFor='btn-group'>Select Your Branch</label>
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
