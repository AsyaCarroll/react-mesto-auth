import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, setValues } = useForm({
        name: '',
        description: ''
    });

    React.useEffect(() => {
        setValues({
            name: currentUser.name,
            description: currentUser.about
        })
    }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name: values.name,
            description: values.description,
        });
    }
 
    return (
        <PopupWithForm
            name="edit-prof"
            title="Редактировать профиль"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <>
                <input type="text" name="name" value={values.name || ''} onChange={handleChange} placeholder="Имя" required="" minLength={2} maxLength={40} className="popup__input popup__input_type_name" id="name-input" />
                <span className="popup__input-error name-input-error" />
                <input type="text" name="about" value={values.description || ''} onChange={handleChange} placeholder="Описание" required="" minLength={2} maxLength={200} className="popup__input popup__input_type_description" id="desc-input" />
                <span className="popup__input-error desc-input-error" />
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;