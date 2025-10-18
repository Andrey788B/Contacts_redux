//Страница списка всех групп.
//Рендерит сетку карточек групп (GroupContactsCard) и делает заголовки кликабельными (withLink → переход на /groups/:groupId).

import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';

import { useAppSelector } from '@/redux/hooks';
import { groupsSelectors } from '@/redux/slices/groupsSlice';
import { GroupContactsCard } from '@/components/GroupContactsCard';

export const GroupListPage = memo(() => {
  const groupContactsList = useAppSelector(groupsSelectors.selectAll);

  return (
    <Row xxl={4}>
      {groupContactsList.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});