import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './store/auth';

export default function Edit() {
    const [classroom_no, setclassroom_no] = useState("");
    const [facility, setfacility] = useState("");
    const [strength, setstrength] = useState("");
    const navigate = useNavigate();
    const { backend_api } = useAuth();

    const { id } = useParams();
    const handleSubmit = async () => {
        const ans = await fetch(`${backend_api}/pclass/${id}`, {
            method: "GET",
        });
        if (ans.ok) {
            const dataa = await ans.json();
            console.log("Response:", dataa.msg);
            setclassroom_no(dataa.msg.classroom_no)
            setfacility(dataa.msg.facility)
            setstrength(dataa.msg.strength)
        } else {
            console.error('Error:', ans.statusText);
        }
    }


    const putRequest = async (id) => {
        const ans = await fetch(`${backend_api}/uclass/${id}?class=${classroom_no}&facility=${facility}&strength=${strength}`, {
            method: "PUT",
        });
        if (ans.ok) {
            const dataa = await ans.json();

            alert("Changes Made Successfully")
            navigate('/manage')
        } else {
            console.error('Error:', ans.statusText);
        }
    }



    

    useEffect(() => {
        handleSubmit();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter ClassRoom No." aria-label="Recipient's username" aria-describedby="basic-addon2" value={classroom_no} onChange={(e)=>{setclassroom_no(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Facility Type" aria-label="Recipient's username" aria-describedby="basic-addon2" value={facility} onChange={(e)=>{setfacility(e.target.value)}}/>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Enter Strength Of Class" aria-label="Recipient's username" aria-describedby="basic-addon2" value={strength} onChange={(e)=>{setstrength(e.target.value)}}/>
                </div>
                <div className='text-center'><button className='btn btn-success' onClick={()=>{putRequest(id)}}>Change</button></div>
            </div>
            <style>{`
    body{
        margin-top:100px
    }
    .input-group input{
        font-weight:bolder
    }
    `}</style>
        </>
    )
}
