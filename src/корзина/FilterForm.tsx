import {Formik} from 'formik';
import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import React, {memo} from 'react';
import {FormikConfig} from 'formik/dist/types';
import {GroupContactsDto} from '@/types';

export interface FilterFormValues {
  name: string;
  groupId: string;
}

interface FilterFormProps extends FormikConfig<FilterFormValues> {
  groupContactsList: GroupContactsDto[];
}

const defaults: FilterFormValues = { name: '', groupId: '' };;


export const FilterForm = memo<FilterFormProps>(({ onSubmit, initialValues = defaults, groupContactsList }) => (
  <Formik<FilterFormValues> initialValues={{ ...defaults, ...initialValues }} onSubmit={onSubmit}>
    {({ handleChange, handleSubmit, values }) => (
      <Form onSubmit={handleSubmit}>
        <Row xxl={4} className="g-4">
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="name"
                aria-label="name"
              />
            </InputGroup>
          </Col>
          <Col>
            <Form.Select
              id="groupId"
              name="groupId"
              aria-label="Поиск по группе"
              value={values.groupId}
              onChange={handleChange}
            >
              <option value="">Все группы</option>
              {groupContactsList.map(g => (
                <option value={g.id} key={g.id}>{g.name}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button variant="primary" type="submit">Применить</Button>
          </Col>
        </Row>
      </Form>
    )}
  </Formik>
));