import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import favoritesReducer, { setFavorites, addFavorite, removeFavorite, toggleFavorite } from './slices/favoritesSlice';
import contactsReducer from './slices/contactsSlice';
import groupsReducer from './slices/groupsSlice';

const preloadedFavs: string[] = (() => {
  try { return JSON.parse(localStorage.getItem('favorites') || '[]'); }
  catch { return []; }
})();

const favoritesListener = createListenerMiddleware();

favoritesListener.startListening({
  matcher: isAnyOf(addFavorite, removeFavorite, toggleFavorite, setFavorites),

  effect: async (_action, api) => {
    const ids = (api.getState() as RootState).favorites.ids;
    localStorage.setItem('favorites', JSON.stringify(ids));
  },
});

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    groups: groupsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefault) => getDefault().concat(favoritesListener.middleware),
});

if (preloadedFavs.length) {
  store.dispatch(setFavorites(preloadedFavs));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;