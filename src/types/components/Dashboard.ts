export type Percent = number;

export interface Slide {
  title: string;
  subtitle?: string[]; 
  bg: string;
  href?: string;
}

export interface Stat {
  value: number;
  label: string;
  img?: string;
  total?: boolean;
  href?: string;
}

export interface SkillItem {
  percent: Percent;
  icon?: string;
  label: string;
  ariaLabel?: string;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
  columns?: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface ContactBarData {
  avatar?: string;
  siteUrl?: string;
  name?: string;
  role?: string;
  primaryPhone?: string;
  primaryEmail?: string;
  secondaryPhone?: string;
  secondaryEmail?: string;
  socials?: SocialLink[];
  portfolio?: SocialLink[];
}

export interface MeterProps {
  percent: Percent;
  ariaLabel?: string;
}

export interface SkillBadgeProps {
  item: SkillItem;
  className?: string;
}

export interface SkillColumnProps {
  group: SkillGroup;
  className?: string;
}

export interface DashboardProps {
  slides?: Slide[];
  stats?: Stat[];
  groups?: SkillGroup[];
  contact?: ContactBarData;
  className?: string;
  onSlideChange?: (index: number) => void;
}