import type { TimelineData } from "@/types/components/TimelineCard";
import type { Stat, SkillGroup, ContactBarData } from "@/types/components/Dashboard";

export interface ContactDashboard {
  stats?: Stat[];
  skillGroups?: SkillGroup[];
  contactBar?: ContactBarData;
}

export interface ContactInfo {
  books?: string[];
  movies?: string[];
  music?: string[];
  hobbies?: string[];
}

export interface ContactDto {
  id: string;
  phone: string;
  name: string;
  birthday: string;
  address: string;
  photo: string;
  info?: ContactInfo; 
  timeline?: TimelineData;
  dashboard?: ContactDashboard;
}

export type ContactPageParams = {
  contactId: string;
};

