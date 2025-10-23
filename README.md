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

# 🪐 Simple Auth Frontend (Next.js + TypeScript)

Frontend sederhana untuk sistem autentikasi & CRUD posts, terhubung dengan backend Hono.js.  
Fitur ini mendukung login JWT, tambah/edit/hapus posts, dan proteksi route dengan token.

## 🚀 Tech Stack

- [Next.js 16 (App Router)](https://nextjs.org/)
- TypeScript
- Tailwind CSS and DaisyUI
- Fetch API / Custom `apiFetch` helper
- JWT Authorization

---

## 📦 Fitur Utama

- ✨ **Sign Up & Sign In**
- 🔐 Token JWT disimpan di `localStorage`
- 👤 Dashboard: lihat semua posts (protected route)
- ➕ Tambah post via modal
- ✏️ Edit post
- 🗑️ Delete post
- 🚪 Logout

---

## ⚙️ Instalasi

1. Clone repository

```bash
git clone
cd next-be
```

2. Install dependencies

```bash
npm install
```

3. Buat file .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Jalankan development server

```bash
npm run dev
```

5. Buka di browser:

http://localhost:3001

(pastikan jalankan dulu backend agar port tidak bentrok dengan backend)

---

🧠 Auth Flow

    Login ➝ dapat JWT ➝ disimpan di localStorage.

    apiFetch otomatis menambahkan Authorization: Bearer <token> ke setiap request yang ke /protected/*.

    Middleware di backend akan verifikasi token sebelum mengizinkan akses.

🧰 Catatan Tambahan

    Pastikan backend sudah running (http://localhost:3000).

    Kalau dapat error 401 Unauthorized, cek apakah token sudah tersimpan.

    Untuk reset token: localStorage.removeItem('token') di DevTools.

---

📜 Lisensi

MIT License © 2025 ✨
