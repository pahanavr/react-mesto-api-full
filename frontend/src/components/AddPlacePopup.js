import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setImage("");
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleImageChange(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCard({
      name: title,
      link: image,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__input">
        <input
          type="text"
          id="title"
          className="popup__field"
          name="title-field"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={title || ""}
          onChange={handleTitleChange}
        />
        <span className="popup__error title-error"></span>
      </label>
      <label className="popup__input">
        <input
          type="url"
          id="image"
          className="popup__field"
          name="image-field"
          placeholder="Ссылка на картинку"
          required
          onChange={handleImageChange}
          value={image || ""}
        />
        <span className="popup__error image-error"></span>
      </label>
    </PopupWithForm>
  );
}
