//Детальная страница контакта.
//Берёт contactId из URL (useParams), ищет соответствующий контакт в contactsState[0] и показывает либо <ContactCard>, либо <Empty>

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/redux/hooks';
import { contactsSelectors } from '@/redux/slices/contactsSlice';

import { ContactCard } from '@/components/ContactCard/ContactCard';
import { Empty } from '@/components/Empty';

export const ContactPage = () => {
  const { contactId = '' } = useParams<{ contactId: string }>();
  const contact = useAppSelector((s) => contactsSelectors.selectById(s, contactId));

  return (
    <Row xxl={3}>
      <Col className="mx-auto">
        {contact ? <ContactCard contact={contact} /> : <Empty />}
      </Col>
    </Row>
  );
};