# 🚀 Sarvar Ziyodullayev - 3D Portfolio & FastAPI Backend

Sarvar Ziyodullayev uchun maxsus ishlab chiqilgan, **FastAPI (Python 3.13)**, **SQLite** va zamonaviy **3D Three.js** texnologiyalariga asoslangan to'liq Full-Stack (Frontend + Backend) arxitekturasi.

---

## 🏗️ Backend Arxitekturasi va Texnologiyalar

- **Asosiy Framework:** FastAPI (Asinxron Python 3.13)
- **ASGI Server:** Uvicorn
- **Ma'lumotlar Bazasi:** SQLite (`backend/database.db`)
- **Validatsiya:** Pydantic v2
- **Interaktiv Hujjatlar:** Swagger UI (`/docs`) va ReDoc (`/redoc`)
- **Bot Integratsiyasi:** Telegram Bot orqali yangi mijozlar haqida tezkor xabarnomalar
- **Admin Boshqaruv:** Maxsus `/admin` Glassmorphism boshqaruv paneli

---

## 📡 RESTful API Endpoints

| Metod | Manzil | Tavsif |
|---|---|---|
| `GET` | `/` | Asosiy 3D Landing Page sahifasi |
| `GET` | `/admin` | Admin Dashboard boshqaruv paneli |
| `GET` | `/docs` | Swagger UI interaktiv API sinov muhiti |
| `GET` | `/health` | Server holati va ishlab chiquvchi ma'lumoti |
| `GET` | `/api/profile` | Sarvarning to'liq rezyume va ma'lumotlar JSON formati |
| `POST` | `/api/contact` | Mijozlardan xabar qabul qilish (baza + Telegram) |
| `GET` | `/api/contact` | Barcha kelib tushgan lidlar va xabarlar ro'yxati |
| `PATCH` | `/api/contact/{id}/status` | Xabar statusini o'zgartirish (`yangi`, `boglanildi`, `yakunlandi`) |
| `DELETE` | `/api/contact/{id}` | Xabarni o'chirish |
| `GET` | `/api/projects` | Portfolio loyihalari ro'yxati (kategoriyalar bo'yicha) |
| `POST` | `/api/projects` | Bazaga yangi loyiha qo'shish |
| `POST` | `/api/analytics/visit` | Tashriflarni qayd qilish |
| `GET` | `/api/analytics` | Konversiya, tashriflar va xizmatlar statistikasi |

---

## 📂 Fayllar Strukturasi

```
d:\Antigravity sinov\
├── backend/
│   ├── main.py              # FastAPI ilovasi va routerlar
│   ├── config.py            # Konfiguratsiya va Telegram sozlamalari
│   ├── database.py          # SQLite ulanishi va jadvallar
│   ├── models.py            # Pydantic ma'lumotlar sxemalari
│   ├── database.db          # SQLite ma'lumotlar bazasi
│   └── routers/
│       ├── contact.py       # Mijozlar xabarlarini boshqarish
│       ├── profile.py       # Sarvar Ziyodullayev biografik ma'lumotlari
│       ├── projects.py      # Portfolio ishlari CRUD
│       ├── stats.py         # Analitika va konversiya
│       └── telegram_bot.py  # Telegram bildirishnomalari
├── css/
│   └── style.css            # 3D Cyber-Emerald dizayn
├── js/
│   ├── audio.js             # Web Audio API tovushlari
│   ├── main.js              # Frontend dinamikasi va API ulanish
│   ├── terminal.js          # Python terminal simulyatori
│   └── three-scene.js       # Three.js 3D kristall
├── index.html               # Asosiy Landing Page
├── admin.html               # Admin Dashboard paneli
├── run_server.py            # Uvicorn FastAPI serverini ishga tushirish
├── start.bat                # 1-klikda Windows uchun ishga tushiruvchi
└── README.md                # Loyiha qo'llanmasi
```

---

## ⚡ Qanday Ishga Tushirish Mumkin?

1. **Windows uchun bir bosishda:**
   `start.bat` fayliga bosing.
2. **Terminal orqali:**
   ```bash
   python run_server.py
   ```
3. **Brauzer manzillari:**
   - Sayt: `http://localhost:8080`
   - Admin Panel: `http://localhost:8080/admin`
   - Swagger API Docs: `http://localhost:8080/docs`
