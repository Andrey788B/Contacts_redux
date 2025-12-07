import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.css";
import { observer } from "mobx-react-lite";
import { useContactsStore } from "@/stores/rootStore";

interface BreadcrumbsProps {
  pathNames: string[];
}

const STATIC_NAMES: Record<string, string> = {
  groups: "Группы",
  contacts: "Контакты",
  favorit: "Избранное",
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = observer(
  ({ pathNames }) => {
    const contactsStore = useContactsStore();
    const {
      contacts,
      groups,
      isContactsLoading,
      isGroupsLoading,
    } = contactsStore;

    // грузим данные, если ещё не загружены
    useEffect(() => {
      contactsStore.fetchContacts();
      contactsStore.fetchGroups();
    }, [contactsStore]);

    const contactsById = useMemo(
      () => new Map(contacts.map((c) => [c.id, c] as const)),
      [contacts]
    );

    const groupsById = useMemo(
      () => new Map(groups.map((g) => [g.id, g] as const)),
      [groups]
    );

    const getLabel = (segment: string, index: number): string => {
      // статические сегменты
      if (STATIC_NAMES[segment]) return STATIC_NAMES[segment];

      // /groups/:groupId
      if (index > 0 && pathNames[index - 1] === "groups") {
        const g = groupsById.get(segment);
        return g?.name ?? segment;
      }

      // /contacts/:contactId
      if (index > 0 && pathNames[index - 1] === "contacts") {
        const c = contactsById.get(segment);
        return c?.name ?? segment;
      }

      return segment;
    };

    const loading = isContactsLoading || isGroupsLoading;

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
                    {loading && !STATIC_NAMES[segment] && " …"}
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
  }
);