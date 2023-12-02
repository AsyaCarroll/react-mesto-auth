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
        <Routes>
            <Route path="/signin" element={
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип Mesto" />
                    <Link to="/signup" className="header__link">Регистрация</Link>
                </header>
            } />
            <Route path="/signup" element={
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип Mesto" />
                    <Link to="/signin" className="header__link">Войти</Link>
                </header>
            } />
            <Route path="/" element={
                <header className="header">
                    <img className="header__logo" src={logo} alt="Логотип Mesto" />
                    <div className="header__section">
                        <p className="header__email">{props.userData}</p>
                        <button onClick={signOut} className="header__logout">Выйти</button>
                    </div>
                </header>
            } />
        </Routes>
    );
}

export default Header;