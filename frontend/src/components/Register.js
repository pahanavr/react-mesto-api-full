import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    onRegister({ email, password })
      .then(resetForm)
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/sign-in");
    }
  }, []);

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="register__input"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="register__button">Зарегистрироваться</button>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__link">
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
