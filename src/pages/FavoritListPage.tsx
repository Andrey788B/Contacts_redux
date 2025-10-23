//Она берёт из favoriteContactsState список id избранных пользователей и по этим id фильтрует все контакты из contactsState.
//Нет возможности добавки и удаления избранных 

import React, { memo, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector } from '@/redux/hooks';
import { ContactCard } from '@/components/ContactCard/ContactCard';
import { useGetContactsQuery } from '@/services/contactsApi';

export const FavoritListPage = memo(() => {
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const { data: allContacts = [], isLoading, isError } = useGetContactsQuery();

  if (isLoading) return <p>Загрузка…</p>;
  if (isError) return <p>Не удалось загрузить контакты</p>;

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