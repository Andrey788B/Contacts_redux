//Загружает все контакты из состояния React.
//Показывает форму фильтра (FilterForm).
//Когда пользователь вводит имя или выбирает группу →
//onSubmit фильтрует список и вызывает setContacts(findContacts).
//React рендерит только те карточки, которые прошли фильтр.

import React, { memo, useEffect, useState } from "react";
import { ContactCard } from "@/components/ContactCard/ContactCard";
import { FilterForm, FilterFormValues } from "@/components/FilterForm/FilterForm";
import { ContactDto } from "@/types";
import "./ContactListPage.css";
import { useContactsStore } from "@/stores/rootStore";
import { useGetContactsQuery, useGetGroupsQuery } from "@/services/contactsApi";
import { observer } from "mobx-react-lite";

export const ContactListPage: React.FC = observer(() => {

    const contactsStore = useContactsStore();
  const { contacts: contactsAll, groups } = contactsStore;

  const [contacts, setContacts] = useState<ContactDto[]>(contactsAll);

  useEffect(() => {
    setContacts(contactsAll);
  }, [contactsAll]);

    if (contactsStore.isContactsLoading || contactsStore.isGroupsLoading) {
    return <p>Загрузка…</p>;
  }

  if (contactsStore.contactsError || contactsStore.groupsError) {
    return <p>Не удалось загрузить данные</p>;
  }
  
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
