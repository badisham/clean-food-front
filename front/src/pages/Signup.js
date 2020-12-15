import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Login.css';

const Signup = () => {
    const history = useHistory();
    if (localStorage.getItem('id')) history.push('/');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConPassword] = useState('');
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setShowResults(confirm_password === password);
        console.log(confirm_password !== password);
    }, [confirm_password, password]);

    const onSignup = () => {
        console.log(username, password, confirm_password);
        if (!username || !password || !confirm_password) {
            Swal.fire('', 'กรุณากรอกข้อมูลให้ครบ', 'error');
        }

        const data = {
            username: username,
            password: password,
            type: 1,
        };
        try {
            axios
                .post('/register', data)
                .then(function (response) {
                    if (!response.data) {
                        Swal.fire('', 'เกิดข้อผิดพลาด', 'error');
                        return;
                    }
                    Swal.fire('', 'สมัครสมาชิกเรียบร้อย', 'success');
                    history.push('/login');
                })
                .catch(function (error) {
                    Swal.fire('', 'เกิดข้อผิดพลาด', 'error');
                });
        } catch (err) {
            Swal.fire('', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์ได้', 'error');
            console.log(err);
        }
    };
    const Results = () => <label className='visually-hidden'>รหัสไม่ตรงกัน</label>;

    return (
        <div className='form-signin'>
            <h1 className='h3 mb-3 fw-normal'>Sign up</h1>
            <label htmlFor='username' className='visually-hidden'>
                Username
            </label>
            <input
                type='text'
                id='username'
                className='form-control'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor='inputPassword' className='visually-hidden'>
                Password
            </label>
            <input
                type='password'
                id='inputPassword'
                className='form-control'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
            />
            <label htmlFor='confirm-inputPassword' className='visually-hidden'>
                Confirm Password
            </label>
            <input
                type='password'
                id='confirm-inputPassword'
                onChange={(e) => setConPassword(e.target.value)}
                className='form-control'
                placeholder='Confirm Password'
                required
            />
            {showResults ? <Results /> : null}

            <button className='w-100 btn btn-lg btn-primary' type='submit' onClick={onSignup}>
                Sign up
            </button>
        </div>
    );
};

export default Signup;
