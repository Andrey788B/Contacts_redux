import React, { createContext, useContext } from "react";
import { FavoritesStore } from "./favoritesStore";
import { ContactsStore } from "./contactsStore";

export class RootStore {
  favoritesStore: FavoritesStore;
  contactsStore: ContactsStore;

  constructor() {
    this.favoritesStore = new FavoritesStore();
    this.contactsStore = new ContactsStore();
  }
}

const rootStore = new RootStore();

const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <RootStoreContext.Provider value={rootStore}>
    {children}
  </RootStoreContext.Provider>
);

export const useRootStore = () => {
  const ctx = useContext(RootStoreContext);
  if (!ctx) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return ctx;
};

export const useFavoritesStore = () => useRootStore().favoritesStore;
export const useContactsStore = () => useRootStore().contactsStore;