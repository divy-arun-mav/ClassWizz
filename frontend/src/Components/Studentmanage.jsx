import React from 'react'
import Navbar from './Navbar'

export default function Studentmanage() {

    
  return (
    <>
    <Navbar/>
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
                                        <Link class="btn btn-success me-2" type="button" id="button-addon2" to={`/edit/${ele._id}`}>Edit</Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>
                </div>
    </div>
    <style>{`
    body{
        margin-top:100px
    }
    `}</style>
    </>
  )
}
