//берёт groupId из URL,
//находит саму группу,
//показывает её карточку (GroupContactsCard),
//ниже — сетку контактов, входящих в группу (ContactCard),
//если группа не найдена — рендерит Empty

import React, { useMemo, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { GroupContactsCard } from "@/components/GroupContactsCard";
import { ContactCard } from "@/components/ContactCard/ContactCard";
import { Empty } from "@/components/Empty";
import { observer } from "mobx-react-lite";
import { useContactsStore } from "@/stores/rootStore";

export const GroupPage = observer(() => {
  const { groupId = "" } = useParams<{ groupId: string }>();
  const contactsStore = useContactsStore();

  const {
    groups,
    contacts: allContacts,
    isGroupsLoading: gL,
    isContactsLoading: cL,
    groupsError: gE,
    contactsError: cE,
  } = contactsStore;

  useEffect(() => {
    contactsStore.fetchGroups();
    contactsStore.fetchContacts();
  }, [contactsStore]);

  if (gL || cL) return <p>Загрузка…</p>;
  if (gE || cE) return <p>Ошибка загрузки</p>;

  const groupContacts = groups.find((g) => g.id === groupId);

  const contacts = useMemo(() => {
    if (!groupContacts?.contactIds?.length) return [];
    const set = new Set(groupContacts.contactIds);
    return allContacts.filter((c) => set.has(c.id));
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
              {contacts.map((contact) => (
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