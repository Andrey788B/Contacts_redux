import React, {memo} from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {GroupContactsDto} from '@/types';

interface GroupContactsCardProps {
  groupContacts: GroupContactsDto,
  withLink?: boolean
}

export const GroupContactsCard = memo<GroupContactsCardProps>(({
    groupContacts: {
      id,
      name,
      description,
      photo,
      contactIds
    }, withLink
  }) => {
    return (
      // убрать key={id} из самого Card
      <Card key={id}> 
        <Card.Img variant="top" src={photo} />        
        <Card.Header>
          {withLink ? <Link to={`/groups/${id}`}>{name}</Link> : name}
        </Card.Header>
        <Card.Body>{description}</Card.Body>
        <Card.Footer>{`Контактов: ${contactIds.length}`}</Card.Footer>
      </Card>
    );
  }
)
