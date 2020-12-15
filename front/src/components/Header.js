import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

const Header = () => {
    axios.defaults.baseURL = 'http://localhost:3001';
    let id = localStorage.getItem('id') ? localStorage.getItem('id') : '';

    const MenuAuth = ({ name, path }) => {
        if (id !== '') {
            return (
                <Link className='nav-link' to={path}>
                    <li className='nav-item' data-bs-toggle='collapse' data-bs-target='#navbarCollapse'>
                        {name}
                    </li>
                </Link>
            );
        } else {
            return '';
        }
    };
    const MenuGeneral = ({ name, path }) => {
        if (id === '' || !id) {
            return (
                <Link className='nav-link' to={path}>
                    <li className='nav-item' data-bs-toggle='collapse' data-bs-target='#navbarCollapse'>
                        {name}
                    </li>
                </Link>
            );
        } else {
            return '';
        }
    };

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
                    <div className='container-fluid'>
                        <Link to='/'>
                            <a
                                className='navbar-brand'
                                href='#'
                                data-bs-toggle='collapse'
                                data-bs-target='#navbarCollapse'
                            >
                                <img style={{ height: '50px' }} src='./images/logo_home.png' alt='' />
                            </a>{' '}
                        </Link>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarCollapse'
                            aria-controls='navbarCollapse'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarCollapse'>
                            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                                <Link className='nav-link' to='/'>
                                    <li
                                        className='nav-item active'
                                        data-bs-toggle='collapse'
                                        data-bs-target='#navbarCollapse'
                                    >
                                        หน้าแรก
                                    </li>
                                </Link>

                                <MenuGeneral name='เข้าสู่ระบบ' path='/login' />
                                <MenuGeneral name='สมัครสมาชิก' path='/sign-up' />
                                <MenuAuth name='ร้านค้า' path='/restaurant-profile' />
                                <MenuAuth name='โปรไฟล' path={`/profile/${id}`} />
                                <MenuAuth name='ออกจากระบบ' path='/logout' />
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
