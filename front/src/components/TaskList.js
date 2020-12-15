import React from 'react';
// import { Link } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
    return (
        <div className='row row-cols-1 row-cols-md-4 mb-4 text-center'>
            <div className='col'>
                <div className='card shadow-sm'>
                    <h6>FREE SHIPPING</h6>
                    <p>Suffered Alteration in some form</p>
                </div>
            </div>
            <div className='col'>
                <div className='card shadow-sm'>
                    <h6>CASH ON DELIVERY</h6>
                    <p>The internet tend to repleat</p>
                </div>
            </div>
            <div className='col'>
                <div className='card shadow-sm'>
                    <h6>45 DAYS RETURN</h6>
                    <p>Making it look like Readable</p>
                </div>
            </div>
            <div className='col'>
                <div className='card shadow-sm'>
                    <h6>OPEN ALL WEKK</h6>
                    <p>24 Hour</p>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
