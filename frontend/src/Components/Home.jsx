import React, { useRef } from 'react';
import back from '../assets/EduManager.png'
import Navbar from './Navbar';

const Home = () => {

    return (
        <div>
            <Navbar />
            <img src={back} alt="background" srcset="" />
            <div className="btn-grp">
                <button className='experience-it1'>Experience It</button>
                <button className='explore-more1'>Explore More</button>
                <button className='experience-it2'>Experience It</button>
                <button className='explore-more2'>Explore More</button>
                <button className='experience-it3'>Experience It</button>
            </div>
            <style>
                {`
                .btn-grp{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                }
                button{
                    background-color:skyblue;
                    border:0.5px solid white;
                    border-radius:10px;
                    padding:10px 20px;
                    font-weight:600;
                    font-size:25px;
                    color:white;
                    position:relative;
                    box-shadow: 5px 7px 10px purple;
                    cursor:pointer;
                }
                .experience-it1{
                    top:600px;
                    right:400px;
                }
                .explore-more1{
                    top:1300px;
                }
                .experience-it2{
                    top:2000px;
                    right:400px;
                }
                .explore-more2{
                    top:2700px;
                }
                .experience-it3{
                    top:3400px;
                    right:400px;
                }
                img{
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:-1;
                    width:100%;
                    user-drag: none;
                    -webkit-user-drag: none;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                }
                `}
            </style>
        </div>
    )
}

export default Home