import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

let file_img;
class RestaurantProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            description: '',
        };
        this.onInputchange = this.onInputchange.bind(this);

        axios.get('/restaurant-profile/' + localStorage.getItem('id')).then((response) => {
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
        file_img = event.target.files[0];
    }

    onSubmitResaurant = async (e) => {
        e.preventDefault();
        console.log(this.state);
        if (!this.state.id && !file_img) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
            return;
        }

        if (!this.state.name || !this.state.genre || !this.state.description) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
            return;
        }
        this.state.user_id = localStorage.getItem('id');
        delete this.state.id;
        const formData = new FormData();
        if (file_img) formData.append('file', file_img);
        formData.append('body', JSON.stringify(this.state));
        try {
            await axios
                .put(`/restaurant/${this.state.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(function (response) {
                    console.log(response);
                    if (response.status !== 200) {
                        Swal.fire('', 'เกิดข้อผิดพลาด1', 'error');
                        return;
                    }
                    if (response.data.insertId) {
                        Swal.fire('', 'ลงทะเบียนร้านเรียบร้อย', 'success');
                        return;
                    }
                    Swal.fire('', 'แก้ไขเรียบร้อย', 'success');
                })
                .catch(function (error) {
                    Swal.fire('', 'เกิดข้อผิดพลาด2', 'error');
                });
        } catch (err) {
            Swal.fire('', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้', 'error');
            console.log(err);
        }
    };

    render() {
        const ButtonAddProduct = () => {
            console.log('aaa');
            if (this.state.id) {
                console.log('bbb');
                return (
                    <Link to={`/restaurant/${this.state.id}/create-product`}>
                        <button className='w-100 btn btn-primary btn-sm'>เพิ่มสินค้า</button>
                    </Link>
                );
            } else return '';
        };

        return (
            <div className='container-fluid'>
                <div className='py-5 text-center'>
                    <h2>ร้านค้า</h2>
                </div>

                <div className='row g-3'>
                    <div className='col-md-5 col-lg-4 order-md-last'>
                        <h4 className='d-flex justify-content-between align-items-center mb-3'>
                            <span className='text-muted'>รายการสินค้า</span>
                            <span className='badge bg-secondary rounded-pill'>3</span>
                        </h4>
                        <ul className='list-group mb-3'>
                            <li className='list-group-item d-flex justify-content-between lh-sm'>
                                <div className='col-2'>
                                    <img src='' alt='' />
                                </div>
                                <div className='col-6'>
                                    <h6 className='my-0'>Product name</h6>
                                    <small className='text-muted'>Brief description</small>
                                </div>
                                <span className='text-muted'>$12</span>
                            </li>

                            {/* <li className='list-group-item d-flex justify-content-between bg-light'>
                                <div className='text-success'>
                                    <h6 className='my-0'>Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className='text-success'>−$5</span>
                            </li> */}

                            <li className='list-group-item d-flex justify-content-between'>
                                <span>Total (USD)</span>
                                <strong>$20</strong>
                            </li>
                        </ul>

                        <div className='input-group'>
                            <input type='text' className='form-control' placeholder='Promo code' />
                            <button type='submit' className='btn btn-secondary'>
                                Redeem
                            </button>
                        </div>
                        <br />
                        <div className='col-12'>
                            <ButtonAddProduct />
                        </div>
                    </div>
                    <div className='col-md-7 col-lg-8'>
                        <h4 className='mb-3'>ร้านค้า</h4>
                        <div className='row g-3'>
                            <div className='col-12'>
                                <label htmlFor='name' className='form-label'>
                                    ชื่อร้าน
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='name'
                                    placeholder=''
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.onInputchange}
                                />
                                <div className='invalid-feedback'>
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='genre' className='form-label'>
                                    ประเภท
                                </label>
                                <select
                                    className='form-select'
                                    id='genre'
                                    name='genre'
                                    value={this.state.genre}
                                    onChange={this.onInputchange}
                                >
                                    <option value=''>เลือก</option>
                                    <option value='clean'>อาหารคลีน</option>
                                    <option value='sweet'>ของหวาน</option>
                                </select>
                                <div className='invalid-feedback'>Please select a valid type.</div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='description' className='form-label'>
                                    คำอธิบาย
                                </label>
                                <textarea
                                    type='text'
                                    className='form-control'
                                    id='description'
                                    placeholder=''
                                    name='description'
                                    value={this.state.description}
                                    onChange={this.onInputchange}
                                />
                                <div className='invalid-feedback'>
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>

                            <div className='col-12'>
                                <label htmlFor='img' className='form-label'>
                                    รูปร้านค้า
                                </label>
                                <input
                                    type='file'
                                    className='form-control'
                                    id='img'
                                    placeholder=''
                                    name='img'
                                    // value={this.state.img}
                                    onChange={this.onImgchange}
                                />
                                <div className='invalid-feedback'>
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <button className='w-50 btn btn-primary btn-sm' onClick={this.onSubmitResaurant}>
                                    แก้ไข
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestaurantProfile;
