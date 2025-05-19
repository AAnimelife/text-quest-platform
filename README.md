# 🧩 Text Quest Platform

Интерактивная веб-платформа для создания, редактирования и прохождения текстовых квестов. Поддерживает ветвящиеся сценарии, переменные, визуализацию дерева выбора и пользовательскую авторизацию.

---

## 📦 Стек технологий

### Backend
- **Node.js**, **Express**
- **MongoDB** + **Mongoose**
- **JWT** для аутентификации
- REST API (авторизация, квесты, страницы)

### Frontend
- **React**
- **MUI (Material UI)** — стилизация
- **React Router** — маршрутизация
- **Axios** — общение с API

---

## 🚀 Запуск проекта

### 1. Клонировать репозиторий

```bash
git clone https://github.com/your-username/text-quest-platform.git
cd text-quest-platform
```
### 2. Установить зависимости

```bash
cd backend
npm install

cd ../frontend
npm install
```
### 3. Настроить переменные окружения

#### Создайте .env файл в папке backend:

```
PORT=5005
MONGO_URI=mongodb://localhost:27017/text-quest
JWT_SECRET=super-secret-key
```
### 4. Запуск
#### Backend
```
cd backend
npm start
```
#### Frontend
```
cd frontend
npm start
```

#### Откроется по адресу: http://localhost:3000
## ✍ Возможности

    Регистрация и вход пользователей

    📖 Создание квестов с переменными и условиями

    🧭 Ветвящиеся страницы и выборы

    🧠 Управление глобальными переменными

    🌳 Визуализация дерева квеста

    🔐 Защищённые маршруты и авторизация через JWT

## ✅ Тестирование
### Unit и Fuzz Testing
```
cd backend
npx jest
```
### Fuzz-тесты (устойчивость к мусорным данным):

#### npx jest backend/\_\_fuzz\_\_

Используется: fast-check
## 📁 Структура проекта


backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── __fuzz_\_/       
├── app.js
├── server.js
└── .env

frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   ├── services/
│   └── App.js
└── public/

## 🔐 Безопасность

    Хеширование паролей через bcrypt

    Валидация и проверка дубликатов при регистрации

    JWT-токены хранятся в localStorage

    Защита маршрутов через middleware

## 👨‍💻 Авторы

Никольский Серафим Вадимович

*ИКБО-30-22*

https://github.com/AAnimelife
    
