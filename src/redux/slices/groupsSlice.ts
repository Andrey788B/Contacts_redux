import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { GroupContactsDto } from '@/types';
import { DATA_GROUP_CONTACT } from '@/__data__';

interface GroupsState { list: GroupContactsDto[] }
const initialState: GroupsState = { list: DATA_GROUP_CONTACT };

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (s, a: PayloadAction<GroupContactsDto>) => { s.list.push(a.payload); },
    removeGroup: (s, a: PayloadAction<string>) => { s.list = s.list.filter(g => g.id !== a.payload); },
    updateGroup: (s, a: PayloadAction<GroupContactsDto>) => {
      const i = s.list.findIndex(g => g.id === a.payload.id);
      if (i >= 0) s.list[i] = a.payload;
    },
  },
});

export const { addGroup, removeGroup, updateGroup } = groupsSlice.actions;
export default groupsSlice.reducer;


export const groupsSelectors = {
  selectAll: (s: RootState) => s.groups.list,
  selectById: (s: RootState, id: string) => s.groups.list.find(g => g.id === id),
};