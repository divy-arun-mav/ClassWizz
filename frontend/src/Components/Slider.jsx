import React from 'react';
import Slider from "react-slick";
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

const Imageslider = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='slider-container'>
            <Slider {...settings}>
                <div>
                    <Card
                        head1="Welcome to EduManager"
                        head2="Your Ultimate Classroom Management Solution"
                        t1="Are you tired of the hassle and chaos involved in managing classroom schedules? Look no further! EduManager is here to revolutionize the way you handle classroom allocation and scheduling"
                        btn1="Experience It"
                        imgSrc={Img1}
                    />
                </div>
                <div>
                    <Card
                        head1="Swift and Easy"
                        head2="Optimize your Resources Effectively"
                        t1="With our advanced resource optimization algorithm, EduManager ensures that classrooms are allocated efficiently based on factors like class size, subject requirements, and facility availability"
                        btn1="Explore More"
                        imgSrc={Img1}
                    />
                </div>
                <div>
                    <Card
                        head1="Stay Up-to-Date with Real-time Schedule"
                        t1="Whether it's last-minute changes or unexpected events, our platform EduManager allows for instant adjustments to the class schedule, ensuring smooth operations at all times"
                        btn1="Experience It"
                        imgSrc={Img1}
                    />
                </div>
                <div>
                    <Card
                        head1="Never Miss a Beat with Automated Notifications"
                        t1="EduManager keeps everyone in the loop with automated notifications. Teachers and students will receive instant alerts about any changes in their classroom assignments, ensuring no one misses important updates"
                        btn1="Explore More"
                        imgSrc={Img1}
                    />
                </div>
                <div>
                    <Card
                        head1="Gain Insights with Historical Data Analysis"
                        t1="Unlock the power of data with EduManager's historical data analysis feature. Identify trends, optimize future scheduling decisions, and take your classroom management to the next level"
                        btn1="Experience It"
                        imgSrc={Img1}
                    />
                </div>
            </Slider>
        </div>
    )
}

export default Imageslider