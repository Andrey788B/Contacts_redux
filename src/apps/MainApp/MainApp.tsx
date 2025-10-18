import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { MainMenu } from '@/components/MainMenu/MainMenu';
import { Layout } from '@/components/Layout';
import { ContactListPage } from '@/pages/ContactListPage/ContactListPage';
import { ContactPage } from '@/pages/ContactPage/ContactPage';
import { GroupListPage } from '@/pages/GroupListPage';
import { GroupPage } from '@/pages/GroupPage';
import { FavoritListPage } from '@/pages/FavoritListPage';

export const MainApp = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<ContactListPage />} />
      <Route path="contacts/:contactId" element={<ContactPage />} />
      <Route path="groups" element={<GroupListPage />} />
      <Route path="groups/:groupId" element={<GroupPage />} />
      <Route path="favorit" element={<FavoritListPage />} />
      <Route path="*" element={<p>404 — страница не найдена</p>} />
    </Route>
  </Routes>
);