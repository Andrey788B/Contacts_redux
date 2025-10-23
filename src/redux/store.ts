import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import favoritesReducer, { setFavorites, addFavorite, removeFavorite, toggleFavorite } from './slices/favoritesSlice';
import { contactsApi } from '@/services/contactsApi';

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
    favorites: favoritesReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(favoritesListener.middleware, contactsApi.middleware),
});

if (preloadedFavs.length) {
  store.dispatch(setFavorites(preloadedFavs));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;