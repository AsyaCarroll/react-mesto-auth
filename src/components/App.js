import React from 'react';
import { ReactDOM } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as sign from '../utils/sign.js';
import imgSuccess from '../images/success.svg';
import imgFail from '../images/fail.svg';
import { useForm } from "../hooks/useForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const { values, handleChange, setValues } = useForm({
    password: '',
    email: ''
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      sign.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
          tokenCheck();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [loggedIn])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleSuccessPopupOpen() {
    setIsSuccessPopupOpen(true);
  }

  function handleFailPopupOpen() {
    setIsFailPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    sign.authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          setValues({ password: '', email: '' });
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        handleFailPopupOpen();
        console.log(err);
      })
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();
    sign.register(values.password, values.email)
      .then(() => {
        handleSuccessPopupOpen();
      })
      .catch((err) => {
        handleFailPopupOpen();
        console.log(err);
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userData={userData} />
        <Routes>
          <Route path="/signup" element={
            <Register
              onSubmit={handleSubmitRegister}
              onChange={handleChange}
              email={values.email}
              password={values.password}
            />}
          />
          <Route path="/signin" element={
            <Login
              handleLogin={handleLogin}
              onSubmit={handleSubmitLogin}
              onChange={handleChange}
              email={values.email}
              password={values.password}
            />}
          />
          <Route path="/"
            element={<ProtectedRouteElement
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              loggedIn={loggedIn}
            />}
          />
          <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name="delete-place"
          title="Вы уверены?"
          button="Да">
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard._id !== undefined}
          onClose={closeAllPopups} />
        <InfoTooltip
          name="infoTooltip"
          isOpen={isSuccessPopupOpen}
          src={imgSuccess}
          alt="Успех!"
          title="Вы успешно зарегистрировались!"
          onClose={closeAllPopups}
          reg={true}
        />
        <InfoTooltip
          name="infoTooltip"
          isOpen={isFailPopupOpen}
          src={imgFail}
          alt="Ошибка!"
          title="Что-то пошло не так! Попробуйте ещё раз."
          onClose={closeAllPopups}
          reg={false}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;