import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete-button ${
    isOwn ? "elements__delete-button" : "elements__delete-button_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_active" : "elements__like-button"
  }`;

  return (
    <article className="elements__item">
      <img
        className="elements__item-image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__item-description">
        <h2 className="elements__item-name">{props.card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
      {isOwn && (<button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteCard}
      ></button>)}
    </article>
  );
}
