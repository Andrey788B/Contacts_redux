// Необходимо изменить итоговое поле чтобы вместо ID было name 

import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { contactsSelectors } from "@/redux/slices/contactsSlice";
import { groupsSelectors } from "@/redux/slices/groupsSlice";
import "./Breadcrumbs.css";

interface BreadcrumbsProps {
  pathNames: string[];
}

const STATIC_NAMES: Record<string, string> = {
  groups: "Группы",
  contacts: "Контакты",
  favorit: "Избранное",
};

export const Breadcrumbs = memo<BreadcrumbsProps>(({ pathNames }) => {
  const idxGroups = pathNames.findIndex((s) => s === "groups");
  const groupId = idxGroups >= 0 ? pathNames[idxGroups + 1] : undefined;

  const idxContacts = pathNames.findIndex((s) => s === "contacts");
  const contactId = idxContacts >= 0 ? pathNames[idxContacts + 1] : undefined;

  const group = useAppSelector((s) =>
    groupId ? groupsSelectors.selectById(s, groupId) : undefined
  );
  const contact = useAppSelector((s) =>
    contactId ? contactsSelectors.selectById(s, contactId) : undefined
  );

  const getLabel = (segment: string, index: number): string => {
    if (STATIC_NAMES[segment]) return STATIC_NAMES[segment];
    if (index > 0 && pathNames[index - 1] === "groups")
      return group?.name ?? segment;
    if (index > 0 && pathNames[index - 1] === "contacts")
      return contact?.name ?? segment;
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
                <span className="breadcrumbs-active">{label}</span>
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