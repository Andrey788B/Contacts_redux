//Страница списка всех групп.
//Рендерит сетку карточек групп (GroupContactsCard) и делает заголовки кликабельными (withLink → переход на /groups/:groupId).

import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from '@/components/GroupContactsCard';
import { useGetGroupsQuery } from '@/services/contactsApi';

export const GroupListPage = memo(() => {
  // const groupContactsList = useAppSelector(groupsSelectors.selectAll);
  const { data: groupContactsList = [], isLoading, isError } = useGetGroupsQuery();
  if (isLoading) return <p>Загрузка…</p>;
  if (isError) return <p>Не удалось загрузить группы</p>;

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