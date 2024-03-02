import React, { useEffect, useRef } from 'react';
import back from '../assets/EduManager.png';
import backres from '../assets/EduManagerResponsive.png';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const bgImg = useRef();
    const navigate = useNavigate();

    const changeBG = () => {
        if (window.innerWidth < 1000) {
            bgImg.current.src = backres;
        } else {
            bgImg.current.src = back;
        }
    }

    useEffect(() => {
        if (window.innerWidth < 1000) {
            bgImg.current.src = backres;
        } else {
            bgImg.current.src = back;
        }
        window.addEventListener('resize', changeBG);

        return () => {
            window.removeEventListener('resize', changeBG);
        };
    }, []);

    return (
        <div>
            <Navbar />
            <img src={back} alt="background" ref={bgImg} />
            <div className="btn-grp">
                <button onCLick={() => { navigate('/about') }} className='experience-it1'>Experience It</button>
                <button onCLick={() => { navigate('/about') }} className='explore-more1'>Explore More</button>
                <button onCLick={() => { navigate('/about') }} className='experience-it2'>Experience It</button>
                <button onCLick={() => { navigate('/about') }} className='explore-more2'>Explore More</button>
                <button onCLick={() => { navigate('/about') }} className='experience-it3'>Experience It</button>
            </div>
            {/* <iframe
                src="https://www.chatbase.co/chatbot-iframe/GfYzYWt2RVJHxYp9msNSN"
                width="100%"
                style={{height: "100%", minHeight: "700px"}}
                frameborder="0"
            ></iframe> */}
            {/* <Footer /> */}
            <style>
                {`
                body{
                    background-color: #e3f5ff;
                }
                .btn-grp{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                    
                }
                .btn-grp button{
                    background-color:skyblue;
                    border:0.5px solid white;
                    border-radius:10px;
                    padding:10px 20px;
                    font-weight:600;
                    font-size:25px;
                    color:white;
                    position:relative;
                    box-shadow: 2px 4px 10px purple;
                    cursor:pointer;
                    z-index:-1;
                }
                .experience-it1{
                    top:650px;
                    right:400px;
                }
                .explore-more1{
                    top:1350px;
                }
                .experience-it2{
                    top:2050px;
                    right:400px;
                }
                .explore-more2{
                    top:2750px;
                }
                .experience-it3{
                    top:3450px;
                    right:400px;
                }
                img{
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:-2;
                    width:100%;
                    user-drag: none;
                    -webkit-user-drag: none;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                }
                @media screen and (max-width:1500px){
                    img{
                        width:100%;
                    }
                    .experience-it1{
                        top:500px;
                        right:400px;
                    }
                    .explore-more1{
                        top:1100px;
                    }
                    .experience-it2{
                        top:1650px;
                        right:400px;
                    }
                    .explore-more2{
                        top:2250px;
                    }
                    .experience-it3{
                        top:2830px;
                        right:400px;
                    }
                    }
                    @media screen and (max-width:720px){
                    img{
                        width:100%;
                    }
                    .experience-it1{
                        top:810px;
                        right:0;
                    }
                    .explore-more1{
                        top:1610px;
                    }
                    .experience-it2{
                        top:2400px;
                        right:0;
                    }
                    .explore-more2{
                        top:3230px;
                    }
                    .experience-it3{
                        top:4050px;
                        right:0;
                    }
                    }
                `}
            </style>
        </div>
    )
}

export default Home;
