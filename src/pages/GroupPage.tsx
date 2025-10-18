//берёт groupId из URL,
//находит саму группу,
//показывает её карточку (GroupContactsCard),
//ниже — сетку контактов, входящих в группу (ContactCard),
//если группа не найдена — рендерит Empty

import React, { memo, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/redux/hooks';
import { contactsSelectors } from '@/redux/slices/contactsSlice';
import { groupsSelectors } from '@/redux/slices/groupsSlice';

import { GroupContactsCard } from '@/components/GroupContactsCard';
import { ContactCard } from '@/components/ContactCard/ContactCard';
import { Empty } from '@/components/Empty';

export const GroupPage = memo(() => {
  const { groupId = '' } = useParams<{ groupId: string }>();

  const groupContacts = useAppSelector(s => groupsSelectors.selectById(s, groupId));
  const allContacts = useAppSelector(contactsSelectors.selectAll);

  const contacts = useMemo(() => {
    if (!groupContacts?.contactIds?.length) return [];
    const set = new Set(groupContacts.contactIds);
    return allContacts.filter(c => set.has(c.id));
  }, [groupContacts, allContacts]);

  return (
    <Row className="g-4">
      {groupContacts ? (
        <>
          <Col xxl={12}>
            <Row xxl={3}>
              <Col className="mx-auto">
                <GroupContactsCard groupContacts={groupContacts} />
              </Col>
            </Row>
          </Col>

          <Col>
            <Row xxl={4} className="g-4">
              {contacts.map(contact => (
                <Col key={contact.id}>
                  <ContactCard contact={contact} withLink />
                </Col>
              ))}
            </Row>
          </Col>
        </>
      ) : (
        <Empty />
      )}
    </Row>
  );
});