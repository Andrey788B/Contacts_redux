import { makeAutoObservable, runInAction } from "mobx";
import type { ContactDto, GroupContactsDto } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE ?? "/data";

export class ContactsStore {
  contacts: ContactDto[] = [];
  groups: GroupContactsDto[] = [];

  isContactsLoading = false;
  isGroupsLoading = false;

  contactsError: string | null = null;
  groupsError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchContacts() {
    // чтобы не дёргать лишний раз
    if (this.isContactsLoading || this.contacts.length) return;

    this.isContactsLoading = true;
    this.contactsError = null;

    try {
      const url =
        baseUrl === "/data" ? `${baseUrl}/contacts.json` : `${baseUrl}/contacts`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: ContactDto[] = await res.json();

      runInAction(() => {
        this.contacts = data;
        this.contactsError = null;
      });
    } catch (e) {
      runInAction(() => {
        this.contactsError =
          e instanceof Error ? e.message : "Не удалось загрузить контакты";
      });
    } finally {
      runInAction(() => {
        this.isContactsLoading = false;
      });
    }
  }

  async fetchGroups() {
    if (this.isGroupsLoading || this.groups.length) return;

    this.isGroupsLoading = true;
    this.groupsError = null;

    try {
      const url =
        baseUrl === "/data"
          ? `${baseUrl}/group-contacts.json`
          : `${baseUrl}/groups`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: GroupContactsDto[] = await res.json();

      runInAction(() => {
        this.groups = data;
        this.groupsError = null;
      });
    } catch (e) {
      runInAction(() => {
        this.groupsError =
          e instanceof Error ? e.message : "Не удалось загрузить группы";
      });
    } finally {
      runInAction(() => {
        this.isGroupsLoading = false;
      });
    }
  }

  getContactById(id: string) {
    return this.contacts.find((c) => c.id === id);
  }

  getGroupById(id: string) {
    return this.groups.find((g) => g.id === id);
  }
}