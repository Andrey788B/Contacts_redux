import React, { useMemo, useState } from "react";
import type { TimelineCardProps, TimelineData, TimelineItem, TimelineTabKey } from "@/types";

const TABS: readonly TimelineTabKey[] = ["edu", "exp"];
const LABEL: Record<TimelineTabKey, string> = {
  edu: "Education",
  exp: "Experience",
};

function isEmptyTimeline(items?: TimelineData): boolean {
  if (!items) return true;
  const hasEdu = Array.isArray(items.edu) && items.edu.length > 0;
  const hasExp = Array.isArray(items.exp) && items.exp.length > 0;
  return !(hasEdu || hasExp);
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  items,
  initialTab = "edu",
  className = "timeline-card block",
  onTabChange,
}) => {
  // если данных нет — ничего не рендерится
  if (isEmptyTimeline(items)) return null;

  // стартовая вкладка должна существовать иначе переключаемся на первую доступную
  const startTab: TimelineTabKey =
    items![initialTab]?.length ? initialTab : (TABS.find((k) => items![k]?.length) as TimelineTabKey);

  const [tab, setTab] = useState<TimelineTabKey>(startTab);

  const active = useMemo<TimelineItem[]>(
    () => (items ? items[tab] ?? [] : []),
    [items, tab]
  );

  const handleTab = (next: TimelineTabKey) => {
    if (tab === next) return;
    setTab(next);
    onTabChange?.(next);
  };

  return (
    <div className={className}>
      {/* tabs */}
      <div className="tabs" role="tablist" aria-label="Timeline tabs">
        {TABS.map((k) => {
          const disabled = !(items![k]?.length);
          return (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              aria-disabled={disabled}
              className={`tab ${tab === k ? "is-active" : ""} ${disabled ? "is-disabled" : ""}`}
              onClick={() => !disabled && handleTab(k)}
              type="button"
            >
              {LABEL[k]}
            </button>
          );
        })}
        <span
          aria-hidden
          className="tab-underline"
          style={{ transform: `translateX(${tab === "exp" ? "100%" : "0"})` }}
        />
      </div>

      {/* timeline */}
      <div className="timeline">
        <div className="tl" role="list">
          {active.map((ev, i) => (
            <React.Fragment key={`${tab}-${i}`}>
              <div className="tl-dot" aria-hidden="true" />
              <div className="tl-card" role="listitem">
                {ev.year && <div className="tl-year">{ev.year}</div>}
                {ev.role && <div className="tl-role">{ev.role}</div>}
                {ev.place && <div className="tl-place">{ev.place}</div>}
                {ev.desc && <div className="tl-desc">{ev.desc}</div>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimelineCard);