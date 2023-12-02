import trash from '../images/trash.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <article className="element">
            <div className="element__pic" onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} />
            {isOwn && <button className="element__trash" onClick={handleDeleteClick} type="button">
                <img src={trash} alt="удалить" />
            </button>}
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Нравится" />
                    <p className="element__count">{props.card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;