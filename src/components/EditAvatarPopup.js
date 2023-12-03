import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarProfile(props) {
    const input = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(input.current.value);
    }

    React.useEffect(() => {
        input.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="patch-avatar"
            title="Обновить аватар"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input
                type="url"
                name="avatar"
                ref={input}
                placeholder="Ссылка"
                required=""
                className="popup__input popup__input_type_link"
                id="avatar-input"
            />
            <span className="popup__input-error avatar-input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarProfile;
