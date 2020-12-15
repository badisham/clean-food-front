import React from 'react';
import './Carousel.css';

const Carousel = () => {
    return (
        <div id='myCarousel' className='carousel slide' data-bs-ride='carousel'>
            <ol className='carousel-indicators'>
                <li data-bs-target='#myCarousel' data-bs-slide-to='0' className='active'></li>
                <li data-bs-target='#myCarousel' data-bs-slide-to='1'></li>
                <li data-bs-target='#myCarousel' data-bs-slide-to='2'></li>
            </ol>
            <div className='carousel-inner'>
                <div
                    className='carousel-item active wrap-image-carousel'
                    style={{
                        backgroundImage: `url(/images/bg.png)`,
                    }}
                >
                    <div className='container'>
                        <div className='carousel-caption text-start'>
                            <h1>Example headline.</h1>
                            <p>
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta
                                gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            </p>
                            <p>
                                <a className='btn btn-lg btn-primary' href='#' role='button'>
                                    Sign up today
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className='carousel-item wrap-image-carousel'
                    style={{
                        backgroundImage: `url(/images/bg.png)`,
                    }}
                >
                    <div className='container'>
                        <div className='carousel-caption'>
                            <h1>Another example headline.</h1>
                            <p>
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta
                                gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            </p>
                            <p>
                                <a className='btn btn-lg btn-primary' href='#' role='button'>
                                    Shop เลย
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className='carousel-item wrap-image-carousel'
                    style={{
                        backgroundImage: `url(/images/bg.png)`,
                    }}
                >
                    <div className='container'>
                        <div className='carousel-caption text-end'>
                            <h1>One more for good measure.</h1>
                            <p>
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta
                                gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            </p>
                            <p>
                                <a className='btn btn-lg btn-primary' href='#' role='button'>
                                    เลือกของหวาน
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <a className='carousel-control-prev' href='#myCarousel' role='button' data-bs-slide='prev'>
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
            </a>
            <a className='carousel-control-next' href='#myCarousel' role='button' data-bs-slide='next'>
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
            </a>
        </div>
    );
};

export default Carousel;
