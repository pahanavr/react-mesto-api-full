import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth";
import InfoToolTip from "./InfoTooltip";

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const history = useHistory();

  const auth = async (jwt) => {
    return mestoAuth.getContent(jwt).then((res) => {
      if (res) {
        console.log(res.email)
        setLoggedIn(true);
        setEmail(res.email);
        history.push("/");
      }
    });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log(loggedIn);
    if (loggedIn) history.push("/");
  }, [loggedIn]);

  useEffect(() => {
    console.log(loggedIn);
    if(loggedIn)
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  const onRegister = ({ email, password }) => {
    return mestoAuth
      .register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error("Что-то пошло не так");
        if (res) {
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("/signin");
          console.log("register");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  };

  const onLogin = ({ email, password }) => {
    return mestoAuth
      .authorize(email, password)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        if (res.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/");
          console.log("login");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
      });
  };

  useEffect(() => {
    console.log(loggedIn);
    if (loggedIn)
    api
      .getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(isLiked)
    const like = isLiked
      ? api.deleteLikeCard(card._id)
      : api.likeCard(card._id);
    like
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  //listener of Edit profile Popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //listener of Add place Popup
  function handleEditPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  //listener of Avatar edit Popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //listener of Image Popup
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .editProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateCard(item) {
    api
      .addNewCard(item)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //listener of Close all popups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleEditPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCard}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route>
            {loggedIn ? 
              <Redirect to="/users/me" />
            :
              <Redirect to="/signin" />
            }
          </Route>
        </Switch>
        {loggedIn && <Footer/>}
        <InfoToolTip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
        />
        <PopupWithForm name="delete" title="Вы уверены?" buttonName="Да" />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
