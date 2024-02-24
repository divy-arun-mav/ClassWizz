import React, { useState } from 'react'

export default function Assignment() {
    const [branch,setBranch] = useState('');
    const [msg,setMsg] = useState('');
    const sendMail = async (id) => {
        const ans = await fetch(`http://localhost:8000/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                msg,
                branch
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
        <div className="container col-6 mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Branch" aria-label="Recipient's username" aria-describedby="basic-addon2" value={branch} onChange={(e)=>{setBranch(e.target.value)}}/>
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Enter Message" aria-label="Recipient's username" aria-describedby="basic-addon2" value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
            </div>
            <div className='text-center'>
            <button className='btn btn-success' onClick={sendMail}>Send Mail</button>
            </div>
        </div>
    )
}
