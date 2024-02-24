import React, { useState,useEffect } from 'react'

export default function TAttendance() {
    const [stu,setStu] = useState("");

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/fetchStudents", {
                method: "GET",
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            });
    
            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    setStu(data.msg);   
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

    useEffect(()=>{
        userAuthentication();
    },[])


  return (
   <>
   <div className='container'>
    <h4 className='text-center m-3'>Attendance</h4>
    <h4 className='text-center m-2'>SUBJECT</h4>
   <div className="table-responsive mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Name</th>
                            <th scope="col" className="text-center">SAP ID</th>
                            <th scope="col" className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(stu) && stu.map((ele) => (
                            <tr key={ele._id}>
                                <td className="text-center">{ele.username}</td>
                                <td className="text-center">{ele.student_id}</td>
                                <td className='text-center'>
                                <button class="btn btn-success me-2" type="button" id="button-addon2" >Present</button>
                                <button class="btn btn-danger ms-2" type="button" id="button-addon2" >Absent</button>
                                {/* onClick={() => allocate(ele._id)} */}
                                </td>
                            </tr>
                        ))}

                    </tbody>


                </table>
            </div>
   </div>
   </>
  )
}
