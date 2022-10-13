import successLogo from "../images/success.svg";
import unSuccessLogo from "../images/unsuccess.svg";

export default function InfoToolTip({isSuccess, name, onClose, isOpen}) {
    return (
        <div
        className={`popup popup_infotooltip_type ${
          isOpen && "popup_opened"
        }`}
      >
        <div className="popup__tooltip-container">
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          ></button>
          <img className="popup__tooltip-image" src={isSuccess ? successLogo : unSuccessLogo} alt="suclogo" />
          <h2 className="popup__tooltip-title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
        </div>
      </div>
    )
}