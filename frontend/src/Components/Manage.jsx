import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

export default function Manage() {
    const [klass, setKlass] = useState("");
    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/fetchClass", {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    setKlass(data.msg);
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [])

    return (

        <>
            <Navbar />
            <div className="container">
                <div className="table-responsive mt-5">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">FacultyName</th>
                                <th scope="col" className="text-center">Facility</th>
                                <th scope="col" className="text-center">ClassRoom</th>
                                <th scope="col" className="text-center">Strength</th>
                                <th scope="col" className="text-center">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(klass) && klass.map((ele) => (
                                <tr key={ele._id}>
                                    <td className="text-center">{ele.faculty_name}</td>
                                    <td className="text-center">{ele.facility}</td>
                                    <td className="text-center">{ele.classroom_no}</td>
                                    <td className="text-center">{ele.strength}</td>
                                    <td className='text-center'>
                                        <button class="btn btn-success me-2" type="button" id="button-addon2" >Edit</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>
                </div>
                <style>{`
                body{
                    margin-top:100px
                }
                `}</style>
            </div>
        </>
    )
}
