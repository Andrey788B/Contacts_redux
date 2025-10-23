import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ContactDto, GroupContactsDto } from '@/types';

// Если укажешь .env с VITE_API_BASE, запросы пойдут туда.
// Иначе — к статике из public/data
const baseUrl = import.meta.env.VITE_API_BASE ?? '/data';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Contacts', 'Groups'],
  endpoints: (builder) => ({
    getContacts: builder.query<ContactDto[], void>({
      query: () => (baseUrl === '/data' ? 'contacts.json' : 'contacts'),
      providesTags: ['Contacts'],
    }),
    getGroups: builder.query<GroupContactsDto[], void>({
      query: () => (baseUrl === '/data' ? 'group-contacts.json' : 'groups'),
      providesTags: ['Groups'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetGroupsQuery,
} = contactsApi;