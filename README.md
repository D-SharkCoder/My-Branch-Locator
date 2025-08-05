# My Branch Locator
This is a full-stack web application built with **Laravel 10** (backend API) and **React 19** (frontend SPA), powered by **PHP 8.2** and **Node.js v22.17.1**.

---

## ⚙️ Technologies Used

- **Backend**: Laravel 10
- **Frontend**: React 19
- **Language**: PHP 8.2, JavaScript (ES6+)
- **Node Version**: v22.17.1
- **Package Managers**: Composer (PHP), npm/yarn (JS)
- **Database**: MySQL or SQLite

---

## 🚀 Installation Guide

#### Clone the Repository

```bash
git clone https://github.com/D-SharkCoder/My-Branch-Locator.git
cd My-Branch-Locator
```

## Backend Installation
### 1. Install dependencies 
```bash
cd backend
composer install
```
### 2. Prepare your environment variables
```bash
cp .env.example .env && cp .env.example .env.testing
php artisan key:generate
```

### 3. Prepare the database
```bash
php artisan migrate:fresh
```

### 4. Start the php server
```bash
php artisan serve
```
---
## Frontend Installation
### 1. Install dependencies
```bash

```

```bash
cd frontend
npm install
```
### 2. Prepare your environment variable
- This application uses Google Map API. If you want, you can put your API_KEY value in the .env file

### 3. Build production-like version
```bash
npm run build
npm run preview
```
