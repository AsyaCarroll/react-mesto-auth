import React from 'react';

function SignForm(props) {
    return (
        <main className="content">
            <section className="sign">
                <form name={`${props.name}`} className="sign__form" onSubmit={props.onSubmit} noValidate>
                    <h2 className="sign__title">{`${props.title}`}</h2>
                    <input
                        name="email"
                        className="sign__input"
                        placeholder="Email"
                        type="email"
                        onChange={props.onChange}
                        value={props.email}
                        required
                    />
                    <input
                        name="password"
                        className="sign__input"
                        placeholder="Пароль"
                        type="password"
                        onChange={props.onChange}
                        value={props.password}
                        required
                    />
                    <button
                        className="sign__submit"
                        type="submit">{`${props.textButton}`}
                    </button>
                    <p className="sign__text">{props.text}{props.link}</p>
                </form>
            </section>
        </main>
    );
}

export default SignForm;