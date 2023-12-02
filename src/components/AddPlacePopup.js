import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {
    const { values, handleChange, setValues } = useForm({
        name: '',
        link: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: values.name,
            link: values.link
        })
    }

    React.useEffect(() => {
        setValues({
            name: '',
            link: ''
        })
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="add-place"
            title="Новое место"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onAddPlace={props.onAddPlace}>
            <>
                <input
                    type="text"
                    name="name"
                    value={values.name || ''}
                    onChange={handleChange}
                    placeholder="Название"
                    required=""
                    minLength={2}
                    maxLength={30}
                    className="popup__input popup__input_type_pic-name"
                    id="place-input" />
                <span className="popup__input-error place-input-error" />
                <input
                    type="url"
                    name="link"
                    value={values.link || ''}
                    onChange={handleChange}
                    placeholder="Ссылка на картинку"
                    required=""
                    className="popup__input popup__input_type_link"
                    id="link-input" />
                <span className="popup__input-error link-input-error" />
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;