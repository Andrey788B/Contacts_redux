1.	Contacts Redux
        Учебное приложение для работы со списком контактов и групп.
        Реализовано с использованием React + TypeScript и переведено на Redux Toolkit
        с применением RTK Query для загрузки данных о контактах и группах.
        Проект демонстрирует современные подходы к управлению состоянием,
        работу с API, типизацию и архитектуру клиентского приложения.

2.	Стек технологий
        -React 18 + TypeScript
        -Redux Toolkit (configureStore, createSlice)
        -RTK Query (для получения данных)
        -React Router DOM
        -React-Bootstrap
        -ESLint (Flat config) + алиасы @/ из tsconfig.json

3.	Логика данных и состояние
    Redux Toolkit
        -Переведён с «чистого Redux» на configureStore и createSlice
        -Удалены старые редьюсеры и ручные action creators
        -Добавлен favoritesSlice для управления избранными контактами
        -Настроен createListenerMiddleware для синхронизации с localStorage

    RTK Query
        -Добавлен сервис contactsApi с fetchBaseQuery
        -Эндпоинты: getContacts, getGroups
        -Хуки: useGetContactsQuery, useGetGroupsQuery
        -Интегрирован contactsApi.reducer и contactsApi.middleware в стор
        -Автоматически управляется кэширование, загрузка и ошибки

4.	Улучшения по сравнению со стартовым проектом
        - Заменён «чистый» Redux на Redux Toolkit (configureStore, createSlice)
        - Добавлен contactsApi (RTK Query)
        - Настроено получение контактов и групп через useGetContactsQuery / useGetGroupsQuery
        - Добавлен favoritesSlice и listener для localStorage
        - Удалена ручная логика Thunk
        - Обновлена структура проекта и типизация

5.	Установка и запуск
        -Установка зависимостей node -v
        -Запуск в dev-режиме npm run dev
        -Сборка production npm run build

6.  Имитация сервер
    При отсутствии переменной окружения VITE_API_BASE RTK Query получает данные из этих файлов, что полностью имитирует работу API-сервера. RTK Query под капотом использует createAsyncThunk.
    При желании можно добавить искусственную задержку (500–800 мс) в baseQuery, чтобы симулировать сетевую задержку.

7.	Планируемые улучшения
        -Фильтр и поиск с debounce и синхронизацией URL.
        -Unit-тесты для слайсов и компонент.
        -Виртуализация списков (для 5k+ контактов).
        -Переводы интерфейса (i18n: ru/en).
        -Возможность добавления/редактирования контактов. 
        -Исправить маршрутизацию (`/contacts/:id`, `/groups/:id`), устранить 404 при переходе.
        -Улучшить адаптивность. 
