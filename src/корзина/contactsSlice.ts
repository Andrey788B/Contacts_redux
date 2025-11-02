import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDto } from '@/types';
import { DATA_CONTACT } from '@/__data__';
import type { RootState } from '@/redux/store'; 

interface ContactsState {
  list: ContactDto[];
}

const initialState: ContactsState = {
  list: DATA_CONTACT,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactDto>) => {
      state.list.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;


export const contactsSelectors = {
  selectAll: (s: RootState) => s.contacts.list,
  selectById: (s: RootState, id: string) => s.contacts.list.find((c) => c.id === id),
};