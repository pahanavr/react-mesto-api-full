export default function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name}_type ${
        props.isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}_type`}
          name={`${props.name}-form`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__submit-button">
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}
