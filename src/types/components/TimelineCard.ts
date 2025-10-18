
export type TimelineTabKey = "edu" | "exp";

export interface TimelineItem {
  year?: string;
  role?: string;
  place?: string;
  desc?: string;
}

export type TimelineData = Record<TimelineTabKey, TimelineItem[]>;

export interface TimelineCardProps {
  items?: TimelineData;
  initialTab?: TimelineTabKey;
  className?: string;
  onTabChange?: (tab: TimelineTabKey) => void;
}