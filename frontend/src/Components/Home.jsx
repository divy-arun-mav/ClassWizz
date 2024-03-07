import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Img1 from '../assets/edum-1.png';

const Card = ({ head1, head2, t1, btn1, imgSrc }) => {
    return (
        <>
            <div className='box-main'>
                <img src={imgSrc} className='img' alt="img" srcset="" />
                <div className='util-box'>
                    <h2 className='head-1'>{head1}</h2>
                    <h1 className='head-2'>{head2}</h1>
                    <p className='t-1'>{t1}</p>
                    <button className='btn1'>{btn1}</button>
                </div>
            </div>
        </>
    );
}


const Home = () => {

    return (
        <div className='home'>
            <div className="nav">
                <Navbar />
            </div>
            <div>
                <Card
                    head1="Welcome to EduManager"
                    head2="Your Ultimate Classroom Management Solution"
                    t1="Are you tired of the hassle and chaos involved in managing classroom schedules? Look no further! EduManager is here to revolutionize the way you handle classroom allocation and scheduling"
                    btn1="Experience It"
                    imgSrc={Img1}
                />
                <Card
                    head1="Swift and Easy"
                    head2="Optimize your Resources Effectively"
                    t1="With our advanced resource optimization algorithm, EduManager ensures that classrooms are allocated efficiently based on factors like class size, subject requirements, and facility availability"
                    btn1="Explore More"
                    imgSrc={Img1}
                />
                <Card
                    head1="Stay Up-to-Date with Real-time Schedule"
                    t1="Whether it's last-minute changes or unexpected events, our platform EduManager allows for instant adjustments to the class schedule, ensuring smooth operations at all times"
                    btn1="Experience It"
                    imgSrc={Img1}
                />
                <Card
                    head1="Never Miss a Beat with Automated Notifications"
                    t1="EduManager keeps everyone in the loop with automated notifications. Teachers and students will receive instant alerts about any changes in their classroom assignments, ensuring no one misses important updates"
                    btn1="Explore More"
                    imgSrc={Img1}
                />
                <Card
                    head1="Gain Insights with Historical Data Analysis"
                    t1="Unlock the power of data with EduManager's historical data analysis feature. Identify trends, optimize future scheduling decisions, and take your classroom management to the next level"
                    btn1="Experience It"
                    imgSrc={Img1}
                />
            </div>
            <Footer />
            <style>
                {`
                body{
                    background-color: #e3f5ff;
                }
                .home{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                    margin-top:100px;
                }
                .btn-grp{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-direction:column;
                    
                }
                .box-main{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:83%;
                    height:auto;
                    background: rgb(54,111,196);
                    background: linear-gradient(90deg, rgba(54,111,196,1) 20%, rgba(151,110,209,1) 100%);
                    border-radius: 40px;
                    margin:0 0 60px 10%;
                    padding:20px;
                    color:white;
                }
                .head-1{
                    font-size:3vw;
                    font-weight:400;
                    margin: 0 0 40px 30px;
                }
                .head-2{
                    font-size:4vw;
                    margin: 0 0 40px 30px;
                    font-weight:600;
                }
                .t-1{
                    font-size:1.5vw;
                    font-weight:400;
                    margin: 0 0 40px 30px;
                }
                .btn1{
                    background-color:skyblue;
                    border:0.5px solid white;
                    border-radius:10px;
                    padding:10px 20px;
                    margin: 0 0 0 100px;
                    font-weight:600;
                    font-size:1.6vw;
                    color:white;
                    box-shadow: 2px 4px 10px purple;
                    cursor:pointer;
                }
                .img{
                    width:35%;
                }
                @media screen and (max-width: 1100px){

                    .nav{
                        z-index: 1;
                    }

                    .box-main{
                        flex-direction: column;
                        text-align:center;
                        // height:70vh;
                        // margin-bottom: 400px;
                        // margin-top: 100px;
                    }
                    .util-box{
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        flex-direction:column;
                        text-align:center;
                    }
                    .img{
                        width:90%;
                        // position:relative;
                        // bottom:40px;
                    }
                    .head-1{
                        font-size:3.5vw;
                        text-align:center;
                        margin:0px 0px 10px 0;
                    }
                    .head-2{
                        font-size:5vw;
                        text-align:center;
                        margin:0px 0px 10px 0;
                    }
                    .t-1{
                        font-size:4vw;
                        text-align:center;
                        margin:0px 0px 10px 0;
                    }
                    .btn1{
                        font-size:3vw;
                        margin:0;
                    }
                }
            `}
            </style>
        </div>
    )
}

export default Home;
