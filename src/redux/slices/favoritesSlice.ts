import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteContactsDto } from '@/types';
import { DATA_CONTACT } from '@/__data__';

interface FavoritesState { ids: FavoriteContactsDto; }

const initialState: FavoritesState = {
  ids: [DATA_CONTACT[0].id, DATA_CONTACT[1].id, DATA_CONTACT[2].id, DATA_CONTACT[3].id],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) state.ids.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.ids = state.ids.includes(id) ? state.ids.filter(f => f !== id) : [...state.ids, id];
    },
    // ⬇ гидрация из localStorage
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.ids = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;