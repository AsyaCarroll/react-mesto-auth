import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup illustration ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <img
                    src={props.card.link}
                    alt={props.card.name}
                    className="popup__illustration-img"
                />
                <figcaption className="popup__illustration-desc">{props.card.name}</figcaption>
                <button onMouseDown={props.onClose} type="button" aria-label="закрыть" className="popup__close" />
            </figure>
        </section>
    )
}

export default ImagePopup;