import React, { useMemo, useState } from "react";
import "./ContactPage.css";
import TimelineCard from "@/components/TimelineCard";

import { useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { contactsSelectors } from "@/redux/slices/contactsSlice";

import type { Slide, Stat, SkillItem, SkillGroup, MeterProps, SkillBadgeProps, SkillColumnProps, ContactBarData } from "@/types";
import type { TimelineData } from "@/types/components/TimelineCard";
import type { ContactPageParams } from "@/types";


const Meter: React.FC<MeterProps> = ({ percent, ariaLabel }) => {
  const totalSpans = 20;
  const safe = Math.max(0, Math.min(100, percent ?? 0));
  const active = Math.round((safe / 100) * totalSpans);
  return (
    <div className="meter" aria-label={ariaLabel ?? `Навык: ${safe}%`}>
      {Array.from({ length: active }).map((_, i) => (
        <span key={i} style={{ ["--i" as any]: i } as React.CSSProperties} />
      ))}
    </div>
  );
};

const SkillBadge: React.FC<SkillBadgeProps> = ({ item, className }) => {
  const { percent, icon, label, ariaLabel } = item;
  return (
    <div className={`wrapper ${className ?? ""}`} data-percent={percent} data-label={label}>
      <Meter percent={percent} ariaLabel={ariaLabel ?? label} />
      <div className="center-badge">
        {icon ? (
          <img className="center-icon" src={icon} alt={label || "icon"} />
        ) : (
          <div className="center-icon no-icon">no icon</div> // заглушка 
        )}
        <div>
          <div className="pct">{Math.round(percent)}%</div>
          <div className="label">{label || "Unnamed skill"}</div>
        </div>
      </div>
    </div>
  );
};

const SkillColumn: React.FC<SkillColumnProps> = ({ group, className }) => {
  return (
    <section className={`skill-group ${className ?? ""}`}>
      <h3>{group.title || "Skills"}</h3>
      <div className="group-row">
        {group.items.map((it, idx) => (
          <SkillBadge key={idx} item={it} />
        ))}
      </div>
    </section>
  );
};


export const ContactPage: React.FC = () => {

  const { contactId } = useParams<ContactPageParams>();
  if (!contactId) return null;

  const contact = useAppSelector((s) => contactsSelectors.selectById(s, contactId));

  const timelineItems: TimelineData | undefined = contact?.timeline;
  const hasTimeline =
    !!timelineItems &&
    ((timelineItems.edu?.length ?? 0) > 0 || (timelineItems.exp?.length ?? 0) > 0);

  /* центр страницы  */
  const stats = useMemo<Stat[]>(
    () =>
      contact?.dashboard?.stats ?? [
        // заглушки 
        { label: "No data", value: 0, img: undefined },
        { label: "No data", value: 0, img: undefined },
        { label: "No data", value: 0, img: undefined },
        { label: "Всего", value: 0, total: true },
      ],
    [contact]
  );

  const groups = useMemo<SkillGroup[]>(
    () =>
      contact?.dashboard?.skillGroups ?? [
        {
          title: "Skills",
          items: [
            { label: "—", percent: 0 }, // заглушка
            { label: "—", percent: 0 },
            { label: "—", percent: 0 },
            { label: "—", percent: 0 },
            { label: "—", percent: 0 },
          ] as SkillItem[],
        },
      ],
    [contact]
  );

  const contactBar = useMemo<ContactBarData>(
    () =>
      contact?.dashboard?.contactBar ?? {
        name: contact?.name ?? "Unknown",
        role: "—",
        avatar: contact?.photo && contact.photo !== "" ? contact.photo : "/images/placeholder-avatar.png", // заглушка
        siteUrl: "#",

        primaryPhone: contact?.phone ?? "—",
        primaryEmail: "—",

        secondaryPhone: "—",
        secondaryEmail: "—",

        socials: [],
        portfolio: [],
      },
    [contact]
  );

const slides = useMemo<Slide[]>(() => {
  const info = contact?.info;

  const take = (arr?: string[]) => (arr && arr.length ? arr.slice(0, 3) : []);
    return [
      { title: "Книги",  subtitle: take(info?.books),  bg: "/public/pic/360_pic1.png"  },
      { title: "Хобби",  subtitle: take(info?.hobbies), bg: "/public/pic/360_pic2.png"  },
      { title: "Фильмы", subtitle: take(info?.movies),  bg: "/public/pic/360_pic3.png" },
      { title: "Музыка", subtitle: take(info?.music),   bg: "/public/pic/360_pic4.png"  },
    ];
  }, [contact?.info]);

  const [active, setActive] = useState(0);

  return (
    <div className="app">
      <main className="app_grid">
        {/* Left */}
        <aside className="col_left col">
          <div className="block h-200 profile-card">
            <img
              className="profile-card_img"
              src={
                contactBar.avatar && contactBar.avatar !== ""
                  ? contactBar.avatar
                  : "/images/placeholder-avatar.png"
              }
              alt={contactBar.name || "Avatar"}
            />
            <div className="profile-card_glass">
              <div className="profile-card_name">{contactBar.name || "Unknown"}</div>
              <div className="profile-card_role">{contactBar.role || "—"}</div>
            </div>
          </div>

          <div className="block h-360 informations-card">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`slide ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
                style={{ backgroundImage: `url('${s.bg}')` }}
              >
                <h2>
                  {s.title} 
                    <span className="inf_text">
                      {(s.subtitle ?? []).length > 0 ? (s.subtitle as string[]).map((line: string, i: number) => (<div key={i}>{line}</div>)): "нет данных"}
                    </span>
                </h2>
              </div>
            ))}
          </div>
        </aside>

        {/* Center */}
        <section className="col_center">
          {stats.length > 0 && (
            <div className="block h-80 top-stats">
              {stats.map((st, i) =>
                st.total ? (
                  <div key={i} className="stat total">
                    <div className="stat-value">{st.value}</div>
                    <div className="stat-label">{st.label}</div>
                  </div>
                ) : (
                  <div key={i} className="stat">
                    {st.img ? (
                      <img src={st.img} alt={st.label} className="stat-gif" />
                    ) : (
                      <div className="stat-gif stat-gif--empty">no img</div> // заглушка
                    )}
                    <div className="stat-value">{st.value}</div>
                    <div className="stat-label">{st.label}</div>
                  </div>
                )
              )}
            </div>
          )}

          {/* skills (c заглушками) */}
          {groups.length > 0 && (
            <div className="h-240 skills-sections">
              {groups.map((g, idx) => (
                <SkillColumn key={idx} group={g} />
              ))}
            </div>
          )}

          {/* contact bar (c заглушками) */}
          <div className="block contact-bar">
            <div className="block_up">
              <div className="cb-left">
                <div className="cb-info">
                  {contactBar.primaryPhone || "—"}
                  <br />
                  {contactBar.primaryEmail || "—"}
                </div>
              </div>

              <div className="cb-center">
                <img
                  className="cb-avatar"
                  src={
                    contactBar.avatar && contactBar.avatar !== ""
                      ? contactBar.avatar
                      : "/images/placeholder-avatar.png"
                  }
                  alt=""
                />
                <a href={contactBar.siteUrl || "#"} className="btn-center">
                  Личный сайт
                </a>
              </div>

              <div className="cb-right">
                <div className="cb-info">
                  {contactBar.secondaryPhone || "—"}
                  <br />
                  {contactBar.secondaryEmail || "—"}
                </div>
              </div>
            </div>

            <div className="block_down">
              {contactBar.socials && contactBar.socials.length > 0 ? (
                <div className="social-left">
                  <span className="group-label">Соц сети</span>
                  <div className="icons">
                    {contactBar.socials.map((s) => (
                      <a key={s.name} href={s.url || "#"} className="icon" aria-label={s.name}>
                        {s.icon ? <img src={s.icon} alt={s.name} /> : <span>{s.name}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="social-left">
                  <span className="group-label">Соц сети</span>
                  <div className="icons"><span className="muted">—</span></div>
                </div>
              )}

              {contactBar.portfolio && contactBar.portfolio.length > 0 ? (
                <div className="social-right">
                  <span className="group-label">Портфолио</span>
                  <div className="icons">
                    {contactBar.portfolio.map((p) => (
                      <a key={p.name} href={p.url || "#"} className="icon" aria-label={p.name}>
                        {p.icon ? <img src={p.icon} alt={p.name} /> : <span>{p.name}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="social-right">
                  <span className="group-label">Портфолио</span>
                  <div className="icons"><span className="muted">—</span></div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right */}
        <aside className="col_right">
          {/* Timeline — только если есть реальные данные в контакте */}
          {hasTimeline && <TimelineCard items={timelineItems} initialTab="exp" />}
        </aside>
      </main>
    </div>
  );
};
