import React, { Component } from 'react';
import './ImageBG.css';

const URL_IMG = 'https://clean-food.s3-ap-southeast-1.amazonaws.com/';

class ImageBG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };
    }

    render() {
        return (
            <div
                class='jumbotron p-3 p-md-5 text-white rounded bg-dark'
                style={{ backgroundImage: `url(${URL_IMG + this.props.img})` }}
            >
                <div id='content-text' class='col-md-6 px-0'>
                    <h1 class='display-4 font-italic'>Title of a longer featured blog post</h1>
                    <p class='lead my-3'>
                        Multiple lines of text that form the lede, informing new readers quickly and efficiently about
                        what's most interesting in this post's contents.
                    </p>
                    <p class='lead mb-0'>
                        <a href='#' class='text-white font-weight-bold'>
                            Continue reading...
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

export default ImageBG;
