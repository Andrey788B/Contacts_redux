//Загружает все контакты из состояния React.
//Показывает форму фильтра (FilterForm).
//Когда пользователь вводит имя или выбирает группу →
//onSubmit фильтрует список и вызывает setContacts(findContacts).
//React рендерит только те карточки, которые прошли фильтр.

import React, { memo, useState } from "react";
import { ContactCard } from "@/components/ContactCard/ContactCard";
import { FilterForm, FilterFormValues } from "@/components/FilterForm/FilterForm";
import { ContactDto } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import "./ContactListPage.css";

export const ContactListPage = memo(() => {
  const contactsAll = useAppSelector((state) => state.contacts.list);
  const groups = useAppSelector((state) => state.groups.list);
  const [contacts, setContacts] = useState<ContactDto[]>(contactsAll);

  const onSubmit = (fv: FilterFormValues) => {
    let findContacts: ContactDto[] = contactsAll;

    if (fv.name) {
      const fvName = fv.name.toLowerCase();
      findContacts = findContacts.filter(({ name }) =>
        name.toLowerCase().includes(fvName)
      );
    }

    if (fv.groupId) {
      const group = groups.find(({ id }) => id === fv.groupId);
      if (group) {
        findContacts = findContacts.filter(({ id }) =>
          group.contactIds.includes(id)
        );
      }
    }

    setContacts(findContacts);
  };

    return (
      <main className="contacts-page">
        <div className="contacts-page__container">
          <div className="contacts-page__filter">
            <FilterForm
              groupContactsList={groups}
              initialValues={{ name: "", groupId: "" }}
              onSubmit={onSubmit}
            />
          </div>

          <div className="contacts-page__list">
            <section className="contacts-grid">
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} withLink />
              ))}

              {!contacts.length && (
                <div className="empty-state">
                  <p>Контакты не найдены</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    );
});
