import React from 'react';
import Carousel from '../components/Carousel';
import ReactCarousel from '../components/ReactCarousel';
import TaskList from '../components/TaskList';

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <div className='container'>
                <div className='row slider-product'>
                    <h1>ทานง่ายไม่เพิ่มพุง</h1>
                    <ReactCarousel name='clean' />
                </div>
                <div className='row slider-product'>
                    <h1>อ้วนน้อยอร่อยหนัก</h1>
                    <ReactCarousel name='sweet' />
                </div>
                <div>
                    <TaskList></TaskList>
                </div>
            </div>
        </div>
    );
};

export default Home;
