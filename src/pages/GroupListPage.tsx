//Страница списка всех групп.
//Рендерит сетку карточек групп (GroupContactsCard) и делает заголовки кликабельными (withLink → переход на /groups/:groupId).

import React, { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { GroupContactsCard } from '@/components/GroupContactsCard';
import { useContactsStore } from "@/stores/rootStore";

export const GroupListPage: React.FC = observer(() => {
  const contactsStore = useContactsStore();
  const { groups } = contactsStore;

  useEffect(() => {
    contactsStore.fetchGroups();
  }, [contactsStore]);

  if (contactsStore.isGroupsLoading) return <p>Загрузка…</p>;
  if (contactsStore.groupsError) return <p>Не удалось загрузить группы</p>;

  return (
    <Row xxl={4}>
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
});