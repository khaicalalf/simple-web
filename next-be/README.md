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

    Install dependencies

```bash
npm install
```

    Buat file .env.local

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

    Jalankan development server

```bash
npm run dev
```

    Buka di browser:

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
