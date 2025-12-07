import React from "react";
import { ContactDto } from "@/types";
import { Link } from "react-router-dom";
import "./ContactCard.css";
import { observer } from "mobx-react-lite";
import { useFavoritesStore } from "@/stores/rootStore";

interface ContactCardProps {
  contact: ContactDto;
  withLink?: boolean;
}

export const ContactCard = observer(
  ({ contact, withLink }: ContactCardProps) => {
    const { id, name, photo, phone, birthday, address } = contact;

    const favoritesStore = useFavoritesStore();
    const isFav = favoritesStore.isFavorite(id);

    const handleKebab = () => {
      favoritesStore.toggleFavorite(id);
    };

  return (
    <article className="ProfileCard" data-id={id}>
      <button className={`Kebab ${isFav ? 'is-active' : ''}`} aria-label={isFav ? 'Убрать из избранного' : 'Добавить в избранное'} aria-pressed={isFav}
          type="button"
          onClick={handleKebab}
          title={isFav ? 'В избранном' : 'Добавить в избранное'}
        >
          {isFav ? '★' : '☆'}
      </button>

      <div className="AvatarWrap">
        <img className="Avatar" src={photo} alt={name} loading="lazy" />
      </div>

      {withLink ? ( <h3 className="Name"> <Link to={`/contacts/${id}`}>{name}</Link> </h3>) : (<h3 className="Name">{name}</h3>)}

      <div className="Verified" aria-hidden="true" />

      <ul className="StatList">
        <li className="StatItem">
          <span className="StatIcon" aria-hidden="true">👥</span>
          <span className="StatLabel">Number Phone</span>
          <span className="StatValue">
            <a href={`tel:${phone}`}>{phone}</a>
          </span>
        </li>
        <li className="StatItem">
          <span className="StatIcon" aria-hidden="true">🎉</span>
          <span className="StatLabel">Birthday</span>
          <span className="StatValue">{birthday || '—'}</span>
        </li>
        <li className="StatItem">
          <span className="StatIcon" aria-hidden="true">🏠</span>
          <span className="StatLabel">Address</span>
          <span className="StatValue">{address || '—'}</span>
        </li>
      </ul>
    </article>
  );
});

