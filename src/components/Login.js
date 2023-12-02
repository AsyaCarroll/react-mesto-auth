import React from 'react';
import SignForm from './SignForm';

function Login(props) {
    return (
        <SignForm
            name="login"
            title="Вход"
            textButton="Войти"
            onSubmit={props.onSubmit}
            onChange={props.onChange}
            email={props.email}
            password={props.password}
        />
    )
}

export default Login;