import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import RestaurantProfile from './pages/RestaurantProfile';
import Restaurant from './pages/Restaurant';
import CreateProduct from './pages/CreateProduct';

ReactDOM.render(
    <Router>
        <Header></Header>
        <div className='container-all'>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/login'>
                    <Login />
                </Route>
                <Route
                    path='/logout'
                    component={() => {
                        localStorage.clear();
                        useHistory().push('/');
                        window.location.reload();
                    }}
                />
                <Route path='/sign-up' component={Signup} />
                <Route path='/profile/:id' component={Profile} />
                <Route path='/restaurant-profile/' component={RestaurantProfile} />
                <Route path='/restaurant/:id' component={Restaurant} />
                <Route path='/restaurant/:id/create-product/' component={CreateProduct} />
            </Switch>
        </div>
    </Router>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
