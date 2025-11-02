import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css";
import { useGetContactsQuery, useGetGroupsQuery } from "@/services/contactsApi";

interface BreadcrumbsProps {
  pathNames: string[];
}

const STATIC_NAMES: Record<string, string> = {
  groups: "Группы",
  contacts: "Контакты",
  favorit: "Избранное",
};

export const Breadcrumbs = memo<BreadcrumbsProps>(({ pathNames }) => {
  // Подтянем данные из RTK Query (если ещё грузятся — просто покажем id как фолбэк)
  const { data: contacts = [], isLoading: cL } = useGetContactsQuery();
  const { data: groups = [], isLoading: gL } = useGetGroupsQuery();

  // Для быстрых O(1) поисков по id сделаем мапы
  const contactsById = useMemo(
    () => new Map(contacts.map((c) => [c.id, c] as const)),
    [contacts]
  );
  const groupsById = useMemo(
    () => new Map(groups.map((g) => [g.id, g] as const)),
    [groups]
  );

  const getLabel = (segment: string, index: number): string => {
    // Статика — как и раньше
    if (STATIC_NAMES[segment]) return STATIC_NAMES[segment];

    // Если перед этим был "groups", текущий segment — это groupId
    if (index > 0 && pathNames[index - 1] === "groups") {
      const g = groupsById.get(segment);
      return g?.name ?? segment; // если ещё грузится/нет в кэше — показываем id
    }

    // Если перед этим был "contacts", текущий segment — это contactId
    if (index > 0 && pathNames[index - 1] === "contacts") {
      const c = contactsById.get(segment);
      return c?.name ?? segment;
    }

    // Иначе — как есть
    return segment;
  };

  return (
    <nav className="breadcrumbs-container" aria-label="Хлебные крошки">
      <div className="breadcrumbs-item">
        <Link to="/" className="breadcrumbs-link">
          Home
        </Link>
      </div>

      {pathNames.map((segment, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;
        const label = getLabel(segment, index);

        return (
          <React.Fragment key={routeTo}>
            <span className="breadcrumbs-sep">/</span>
            <div className="breadcrumbs-item">
              {isLast ? (
                <span className="breadcrumbs-active">
                  {label}
                  {/* можно показать спиннерчик, пока подменяем id на name */}
                  {(cL || gL) && !STATIC_NAMES[segment] && " …"}
                </span>
              ) : (
                <Link to={routeTo} className="breadcrumbs-link">
                  {label}
                </Link>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
});