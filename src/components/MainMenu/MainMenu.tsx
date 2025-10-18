import React from "react";
import { Link, NavLink } from 'react-router-dom'
import "./MainMenu.css";

export const MainMenu = () => {
  return (
    <header className="mainmenu">
      <div className="mainmenu__container">
        <Link to="/" className="mainmenu__brand">Книга контактов</Link>
        <nav className="mainmenu__nav">
          <NavLink to="/groups">Группы</NavLink>
          <NavLink to="/favorit">Избранное</NavLink>
        </nav>
      </div>

      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <span className="breadcrumbs__item">
          <a href="/">Главная</a>
        </span>
        <span className="breadcrumbs__sep" aria-hidden="true"></span>
        <span
          className="breadcrumbs__item breadcrumbs__item--truncate hide-sm"
        >
          <a href="/contacts">Книга контактов</a>
        </span>
        <span className="breadcrumbs__sep hide-sm" aria-hidden="true"></span>
        <span className="breadcrumbs__item" aria-current="page">
          Группы
        </span>
      </nav>
    </header>
  );
};