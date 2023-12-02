import React from 'react';
import Popup from './Popup';

function PopupWithForm(props) {
    return (
        <Popup
            isOpen={props.isOpen}
            name={props.name}
            onClose={props.onClose}
        >
            <form
                action="#"
                name={props.name}
                className={`popup__form popup__${props.name}`}
                onSubmit={props.onSubmit}
            >
                <h2 className="popup__edit-title">{props.title}</h2>
                {props.children}
                <button className="popup__submit" type="submit">{props.button}</button>
            </form>
        </Popup>
    )
}

export default PopupWithForm;