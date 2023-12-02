import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__container">
                        <div className="profile__avatar-container">
                            <div
                                className="profile__avatar"
                                style={{ backgroundImage: `url(${currentUser.avatar})` }}
                            />
                            <div alt="редактировать аватар" className="profile__avatar-edit" onClick={props.onEditAvatar} />
                        </div>
                        <div className="profile__info">
                            <div className="profile__name-options">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button
                                    type="button"
                                    aria-label="редактировать"
                                    className="profile__edit-button"
                                    onClick={props.onEditProfile}
                                />
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="profile__add-button"
                        onClick={props.onAddPlace} />
                </section>
            </main>
            <section className="elements" aria-label="фотографии">
                {props.cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </>
    );
}

export default Main;