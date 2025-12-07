
import React, { memo, useMemo, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { useAppSelector } from '@/redux/hooks';
import { ContactCard } from '@/components/ContactCard/ContactCard';
import { useGetContactsQuery } from '@/services/contactsApi';
import { useFavoritesStore, useContactsStore } from "@/stores/rootStore";

export const FavoritListPage: React.FC = observer(() => {
  const favoritesStore = useFavoritesStore();
  const contactsStore = useContactsStore();

  const favoriteIds = favoritesStore.ids;

  useEffect(() => {
    contactsStore.fetchContacts();
  }, [contactsStore]);

  if (contactsStore.isContactsLoading) return <p>Загрузка…</p>;
  if (contactsStore.contactsError)
    return <p>Не удалось загрузить контакты</p>;

  const allContacts = contactsStore.contacts;

  const contacts = useMemo(() => {
    if (!favoriteIds.length) return [];
    const set = new Set(favoriteIds);
    return allContacts.filter(({ id }) => set.has(id));
  }, [favoriteIds, allContacts]);

  return (
    <Row xxl={4} className="g-4">
      {contacts.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
});