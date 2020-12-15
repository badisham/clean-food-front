import React, { Component } from 'react';
import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Redirect } from 'react-router-dom';
import ImageBG from '../components/ImageBG';
class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.onInputchange = this.onInputchange.bind(this);

        axios.get('/restaurant-store/' + props.match.params.id).then((response) => {
            if (response.data) {
                this.setState(response.data);
            }
        });
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    onImgchange(event) {
        this.setState({
            [event.target.name]: event.target.files[0],
        });
    }

    // onSubmitResaurant = async (e) => {
    //     e.preventDefault();
    //     if ((this.state.name || this.state.genre, this.state.img)) {
    //         Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('file', this.state.img);
    //     formData.append('body', JSON.stringify(this.state));
    //     return;
    //     try {
    //         const res = await axios
    //             .post('/restaurant', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             })
    //             .then(function (response) {
    //                 console.log(response);
    //                 if (!response.data.id) {
    //                     Swal.fire('', 'เกิดข้อผิดพลาด1', 'error');
    //                     return;
    //                 }
    //                 Swal.fire('', 'ลงทะเบียนร้านเรียบร้อย', 'success');
    //                 return <Redirect to='/' />;
    //             })
    //             .catch(function (error) {
    //                 Swal.fire('', 'เกิดข้อผิดพลาด2', 'error');
    //             });
    //         console.log(res);
    //     } catch (err) {
    //         Swal.fire('', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้', 'error');
    //         console.log(err);
    //     }
    // };

    render() {
        return (
            <div>
                <ImageBG img={this.state.img} />{' '}
                <div className='container-fluid'>
                    <div className='py-5 text-center'>
                        <h2>{this.state.name}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurant;
