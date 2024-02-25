import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { useAuth } from './store/auth';

export default function ClassRoom() {
    const [data, setData] = useState('');
    const [strength, setStrength] = useState('');
    const userData = JSON.parse(localStorage.getItem("USER"));
    const [branch, setBranch] = useState('');
    const [msg, setMsg] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const { backend_api } = useAuth();

    const sendMail = async (msg, selectedBranch) => {
        // Use the selectedBranch state variable in your fetch request or any other logic
        console.log('Selected Branch:', selectedBranch);

        const ans = await fetch(`${backend_api}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                msg,
                branch: selectedBranch,
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

    const handleSubmit = async () => {
        const ans = await fetch(`${backend_api}/getclassroom/?strength=${strength}`, {
            method: "GET",
           
        });
        if (ans.ok) {
            const dataa = await ans.json();
            console.log("Response:", dataa);
            setData(dataa.classrooms);
        } else {
            console.error('Error:', ans.statusText);
        }
    }

    const allocate = async (id) => {
        const ans = await fetch(`${backend_api}/updateclass/?id=${id}`, {
            method: "PUT",
        });
        if (ans.ok) {
            const updatedData = data.filter((ele) => ele._id !== id);
            setData(updatedData);
          
            alert("Class Allocated Successfully");
            sendMail("There have been some changes in your branch", userData.branch);
            setStrength("");
        } else {
            console.error('Error:', ans.statusText);
        }
    }


    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Class Strength" aria-label="Recipient's username" aria-describedby="button-addon2" value={strength} onChange={(e) => { setStrength(e.target.value) }} />
                <button class="btn btn-success" type="button" id="button-addon2" onClick={handleSubmit}>Button</button>
            </div>

            <div className="table-responsive mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Strength</th>
                            <th scope="col" className="text-center">Facility</th>
                            <th scope="col" className="text-center">CR No.</th>
                            <th scope="col" className="text-center">Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map((ele) => (
                            <tr key={ele._id}>
                                <td className="text-center">{ele.strength}</td>
                                <td className="text-center">{ele.facility}</td>
                                <td className="text-center">{ele.classroom_no}</td>
                                <td className="text-center">
                                    <button class="btn btn-primary" type="button" id="button-addon2" onClick={() => allocate(ele._id)}>Allocate</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>


                </table>
            </div>
            <style>{`
            .input-group input{
                border:2px solid black;
                color: black;
                font-weight:bolder;
            }
            body{
                margin-top:100px
            }
            `}</style>
        </div>
        </>
    )
}
