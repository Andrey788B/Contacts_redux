import React, { memo } from "react";
import { Formik } from "formik";
import { FormikConfig } from "formik/dist/types";
import { GroupContactsDto } from "@/types";
import "./FilterForm.css";

export interface FilterFormValues {
  name: string;
  groupId: string;
}

interface FilterFormProps extends FormikConfig<FilterFormValues> {
  groupContactsList: GroupContactsDto[];
}

const defaults: FilterFormValues = { name: "", groupId: "" };

export const FilterForm = memo<FilterFormProps>(
  ({ onSubmit, initialValues = defaults, groupContactsList }) => (
    <Formik<FilterFormValues>
      initialValues={{ ...defaults, ...initialValues }}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <form className="filter" onSubmit={handleSubmit}>
          <div className="filter__fields">
            <label className="field">
              <span className="field__label">Имя</span>
              <div className="input-wrap">
                <input id="name" name="name" value={values.name} onChange={handleChange} placeholder="Введите имя" aria-label="Имя" className="input"/>
                {values.name && (
                  <button type="button" className="clear-btn" aria-label="Очистить" onClick={() => handleChange({ target: { name: "name", value: "" } })} >×</button>
                )}
              </div>
            </label>

            <label className="field">
              <span className="field__label">Группа</span>
              <select id="groupId" name="groupId" aria-label="Поиск по группе" value={values.groupId} onChange={handleChange} className="select">
                <option value="">Все группы</option>
                {groupContactsList.map((g) => (
                  <option value={g.id} key={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="filter__actions">
            <button type="submit" className="btn btn--primary">
              Применить
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
);