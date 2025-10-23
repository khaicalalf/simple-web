# 🌙 Hono Auth Backend (Hono.js + PostgreSQL)

Backend sederhana untuk autentikasi JWT dan CRUD user.  
Menggunakan [Hono.js](https://hono.dev/) sebagai web framework ringan dan PostgreSQL sebagai database.

## 🧰 Tech Stack

- [Hono.js](https://hono.dev/)
- PostgreSQL
- pg (node-postgres)
- bcrypt (hash password)
- jsonwebtoken
- dotenv
- TypeScript

---

## 📦 Fitur Utama

- ✨ Register user (public)
- 🔑 Login user (JWT)
- 🛡️ Middleware autentikasi
- 🧑 CRUD Post (protected)
- CORS support

---

## ⚙️ Persiapan & Instalasi

1. Clone repository

```bash
git clone
cd hono-be
```

2. Install dependencies

```bash
npm install
```

3. Setup database di pgAdmin atau CLI PostgreSQL:

```bash
CREATE DATABASE auth_demo;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Buat file .env

```bash
DATABASE_URL=postgres://postgres:password@localhost:5432/auth_demo
JWT_SECRET="bebas"
PORT=3000
```

5. Jalankan server:

```bash
npx tsx src/index.ts
```

Backend akan jalan di:

http://localhost:3000

---

🧰Middleware Auth

Semua route yang diawali /protected/\* menggunakan authMiddleware.

Token diverifikasi menggunakan jsonwebtoken.

Jika token tidak valid ➝ response 401 Unauthorized.

---

🐘 Database

PostgreSQL

📜 Lisensi

MIT License © 2025 ✨
