import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import './Login.css';

const Login = () => {
    const history = useHistory();
    if (localStorage.getItem('id')) history.push('/');
    let username = '';
    let password = '';

    const onSubmitLogin = () => {
        if (!username || !password) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
            return;
        }

        const data = {
            username: username,
            password: password,
        };
        try {
            axios
                .post('/login', data)
                .then(function (response) {
                    if (!response.data.id) {
                        Swal.fire('', 'Username หรือ password ไม่ถูกต้อง', 'error');
                        return;
                    }
                    localStorage.setItem('id', response.data.id);
                    localStorage.setItem('username', response.data.username);
                    Swal.fire('', 'ยินดีต้อนรับเข้าสู่ระบบ', 'success');
                    history.push('/');
                    window.location.reload();
                })
                .catch(function (error) {
                    Swal.fire('', error.message, 'error');
                });
        } catch (error) {
            Swal.fire('', error.message, 'error');
        }
    };
    return (
        <div className='form-signin'>
            <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
            <label htmlFor='username' className='visually-hidden'>
                Username{' '}
            </label>
            <input
                type='text'
                id='username'
                className='form-control'
                placeholder='username'
                onChange={(e) => {
                    username = e.target.value;
                }}
                required
            />
            <label htmlFor='inputPassword' className='visually-hidden'>
                Password
            </label>
            <input
                type='password'
                id='inputPassword'
                className='form-control'
                placeholder='Password'
                onChange={(e) => {
                    password = e.target.value;
                }}
                required
            />
            <div className='checkbox mb-3'>
                <label>
                    <input type='checkbox' value='remember-me' /> Remember me
                </label>
            </div>
            <button className='w-100 btn btn-lg btn-primary' type='submit' onClick={onSubmitLogin}>
                Sign in
            </button>
        </div>
    );
};

export default Login;
