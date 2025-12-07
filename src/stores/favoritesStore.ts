import { makeAutoObservable, reaction } from "mobx";
import type { FavoriteContactsDto } from "@/types";
import { DATA_CONTACT } from "@/__data__";

const DEFAULT_FAVORITES: FavoriteContactsDto = [
  DATA_CONTACT[0]?.id,
  DATA_CONTACT[1]?.id,
  DATA_CONTACT[2]?.id,
  DATA_CONTACT[3]?.id,
].filter(Boolean);

const LS_KEY = "favorites";

export class FavoritesStore {
  ids: FavoriteContactsDto = DEFAULT_FAVORITES;

  constructor() {
    makeAutoObservable(this);

    // гидрация из localStorage
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.ids = parsed;
        }
      }
    } catch {
      // ignore
    }

    // сохранение в localStorage
    reaction(
      () => this.ids.slice(),
      (ids) => {
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(ids));
        } catch {
          // ignore
        }
      }
    );
  }

  addFavorite(id: string) {
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }
  }

  removeFavorite(id: string) {
    this.ids = this.ids.filter((x) => x !== id);
  }

  toggleFavorite(id: string) {
    this.ids = this.ids.includes(id)
      ? this.ids.filter((x) => x !== id)
      : [...this.ids, id];
  }

  setFavorites(ids: string[]) {
    this.ids = [...ids];
  }

  get count() {
    return this.ids.length;
  }

  isFavorite(id: string) {
    return this.ids.includes(id);
  }
}