export default function ImagePopup(props) {
  return (
    <div className={`popup popup_image_type ${props.isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}
