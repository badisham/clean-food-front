import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onInputchange = this.onInputchange.bind(this);

        axios.get('/user/' + props.match.params.id).then((response) => {
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
    onSubmitProfile = () => {
        if (!this.state.email || !this.state.first_name || !this.state.last_name || !this.state.tel) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'warning');
            return;
        }
        try {
            axios
                .put('/user/' + this.props.match.params.id, this.state)
                .then(function (response) {
                    Swal.fire('', 'แก้ไขข้อมูลเรียบร้อย', 'success');
                    return <Redirect to='/' />;
                })
                .catch(function (error) {
                    Swal.fire('', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้', 'error');
                    console.log(error);
                });
        } catch (err) {
            Swal.fire('', 'ผิดพลาด', 'error');
            console.log(err);
        }
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='py-5 text-center'>
                    <h2>Profile</h2>
                </div>

                <div className='row g-3'>
                    <div className='col-md-5 col-lg-4 order-md-last'>
                        <h4 className='d-flex justify-content-between align-items-center mb-3'>
                            <span className='text-muted'>Your cart</span>
                            <span className='badge bg-secondary rounded-pill'>3</span>
                        </h4>
                        <ul className='list-group mb-3'>
                            <li className='list-group-item d-flex justify-content-between lh-sm'>
                                <div>
                                    <h6 className='my-0'>Product name</h6>
                                    <small className='text-muted'>Brief description</small>
                                </div>
                                <span className='text-muted'>$12</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between lh-sm'>
                                <div>
                                    <h6 className='my-0'>Second product</h6>
                                    <small className='text-muted'>Brief description</small>
                                </div>
                                <span className='text-muted'>$8</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between lh-sm'>
                                <div>
                                    <h6 className='my-0'>Third item</h6>
                                    <small className='text-muted'>Brief description</small>
                                </div>
                                <span className='text-muted'>$5</span>
                            </li>
                            <li className='list-group-item d-flex justify-content-between bg-light'>
                                <div className='text-success'>
                                    <h6 className='my-0'>Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className='text-success'>−$5</span>
                            </li>
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
                    </div>
                    <div className='col-md-7 col-lg-8'>
                        <h4 className='mb-3'>ข้อมูลส่วนตัว</h4>
                        <div className='row g-3'>
                            <div className='col-12'>
                                <label htmlFor='email' className='form-label'>
                                    Email
                                    {/* <span className='text-muted'>(Optional)</span> */}
                                </label>
                                <input
                                    type='email'
                                    className='form-control'
                                    id='email'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.onInputchange}
                                    placeholder='you@example.com'
                                />
                                <div className='invalid-feedback'>
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <label htmlFor='firstname' className='form-label'>
                                    ชื่อ
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='first_name'
                                    placeholder=''
                                    name='first_name'
                                    value={this.state.first_name}
                                    onChange={this.onInputchange}
                                    required
                                />
                                <div className='invalid-feedback'>Valid first name is required.</div>
                            </div>

                            <div className='col-sm-6'>
                                <label htmlFor='lastname' className='form-label'>
                                    นามสกุล
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='last_name'
                                    placeholder=''
                                    name='last_name'
                                    value={this.state.last_name}
                                    onChange={this.onInputchange}
                                    required
                                />
                                <div className='invalid-feedback'>Valid last name is required.</div>
                            </div>
                            <div className='col-12'>
                                <label htmlFor='tel' className='form-label'>
                                    เบอร์โทรศัพท์
                                    <span className='text-muted'>(Optional)</span>
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='tel'
                                    name='tel'
                                    value={this.state.tel}
                                    onChange={this.onInputchange}
                                    placeholder=''
                                />
                                <div className='invalid-feedback'>
                                    Please enter a valid email address for shipping updates.
                                </div>
                            </div>
                            <div className='col-12 text-end'>
                                <button
                                    className='w-25 btn btn-primary btn-sm'
                                    type='submit'
                                    onClick={this.onSubmitProfile}
                                >
                                    แก้ไข
                                </button>
                            </div>
                        </div>

                        <hr className='my-4' />
                        <div className='row g-3'>
                            <div className='col-12'>
                                <label htmlFor='address' className='form-label'>
                                    ที่อยู่
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='address'
                                    placeholder='1234 Main St'
                                    name='address'
                                    value={this.state.address}
                                    onChange={this.onInputchange}
                                    required
                                />
                                <div className='invalid-feedback'>Please enter your shipping address.</div>
                            </div>

                            <div className='col-md-5'>
                                <label htmlFor='province' className='form-label'>
                                    เขต
                                </label>
                                <select
                                    className='form-select'
                                    id='province'
                                    name='province'
                                    value={this.state.province}
                                    onChange={this.onInputchange}
                                    required
                                >
                                    <option value=''>Choose...</option>
                                </select>
                                <div className='invalid-feedback'>Please select a valid country.</div>
                            </div>

                            <div className='col-md-4'>
                                <label htmlFor='district' className='form-label'>
                                    แขวง
                                </label>
                                <select
                                    className='form-select'
                                    id='district'
                                    name='district'
                                    value={this.state.district}
                                    onChange={this.onInputchange}
                                    required
                                >
                                    <option value=''>Choose...</option>
                                </select>
                                <div className='invalid-feedback'>Please provide a valid state.</div>
                            </div>

                            <div className='col-md-3'>
                                <label htmlFor='zip_code' className='form-label'>
                                    รหัสไปรษณีย์
                                </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='zip_code'
                                    placeholder=''
                                    name='zip_code'
                                    value={this.state.zip_code}
                                    onChange={this.onInputchange}
                                    required
                                />
                                <div className='invalid-feedback'>Zip code required.</div>
                            </div>
                            <div className='col-12 text-end'>
                                <button className='w-25 btn btn-primary btn-sm' type='submit'>
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

export default Profile;
