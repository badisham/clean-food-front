import React, { Component } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ReactCarousel.css';

const URL_IMG = 'https://clean-food.s3-ap-southeast-1.amazonaws.com/';

const getCard = (data) => {
    return (
        <Link to={`/restaurant/${data.id}`}>
            <div className='card'>
                <div className='card-img-top' style={{ backgroundImage: `url(${URL_IMG + data.img})` }}></div>
                {/* <img className='card-img-top' src={URL_IMG + data.img} /> */}
                <div className='card-body'>
                    <h5 className='card-title'>{data.name}</h5>
                    <div className='card-text'>{data.description}</div>
                    <a className='btn btn-primary'>เลือกเลย</a>
                </div>
            </div>
        </Link>
    );
};

class ReactCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
        axios.get('/restaurants?genre=' + props.name).then((response) => {
            if (response.data) {
                console.log(response.data);
                this.setState({ data: response.data });
            }
        });
    }

    render() {
        const amountShow = window.screen.width > 500 ? 3 : 1;
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: amountShow,
            slidesToScroll: 1,
        };

        return <Slider {...settings}>{this.state.data.map((card) => getCard(card))}</Slider>;
    }
}

export default ReactCarousel;
