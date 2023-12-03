import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    const navigate = useNavigate();
    function signOut() {
        localStorage.removeItem('jwt');
        navigate('/signin', { replace: true });
    }
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto" />
            <Routes>
                <Route path="/signin" element={
                    <Link to="/signup" className="header__link">Регистрация</Link>
                } />
                < Route path="/signup" element={
                    <Link to="/signin" className="header__link">Войти</Link>
                } />
                < Route path="/" element={
                    <div className="header__section">
                        <p className="header__email">{props.userData}</p>
                        <button onClick={signOut} className="header__logout">Выйти</button>
                    </div>
                } />
            </Routes >
        </header >
    );
}

export default Header;