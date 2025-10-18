//Она берёт из favoriteContactsState список id избранных пользователей и по этим id фильтрует все контакты из contactsState.
//Нет возможности добавки и удаления избранных 

import React, { memo, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useAppSelector } from '@/redux/hooks';
import { contactsSelectors } from '@/redux/slices/contactsSlice';
import { ContactCard } from '@/components/ContactCard/ContactCard';

export const FavoritListPage = memo(() => {
  const favoriteIds = useAppSelector((s) => s.favorites.ids);
  const allContacts = useAppSelector(contactsSelectors.selectAll);

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