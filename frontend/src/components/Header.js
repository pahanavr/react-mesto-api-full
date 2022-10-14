import headerLogo from "../images/logo.svg";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export default function Header({email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="лого" />
      <Switch>
        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">Войти</Link>
        </Route>
        <Route path="/">
          <div className="header__auth-box">
            <p className="header__email">{email}</p>
            <Link to="/signin" className="header__link" onClick={onSignOut}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
