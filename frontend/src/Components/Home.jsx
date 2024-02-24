import React from 'react';
import back from '../assets/EduManager.png'
import Navbar from './Navbar';

const Home = () => {
    return (
        <div>
            <Navbar />
            <img src={back} alt="background" srcset="" />
        </div>
    )
}

export default Home