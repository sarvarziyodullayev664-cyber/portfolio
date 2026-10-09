import sqlite3
import datetime
from contextlib import contextmanager
from backend.config import DB_PATH

def init_db():
    """Create tables if they do not exist."""
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        
        # 1. Contacts table (leads & messages)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                contact TEXT NOT NULL,
                service TEXT,
                message TEXT NOT NULL,
                ip_address TEXT,
                status TEXT DEFAULT 'yangi',
                created_at TEXT NOT NULL
            )
        """)

        # 2. Analytics table (page visits)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS analytics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ip_address TEXT,
                user_agent TEXT,
                visited_at TEXT NOT NULL
            )
        """)

        # 3. Projects table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                tags TEXT,
                created_at TEXT NOT NULL
            )
        """)

        # Seed initial projects if empty
        cursor.execute("SELECT COUNT(*) FROM projects")
        count = cursor.fetchone()[0]
        if count == 0:
            initial_projects = [
                ("Bravos Qarshi & Bugun Agency", "video", "Bugun Agency media agentligida Video Montajor sifatida faoliyat yuritaman. Agentlik doirasida @bravos_qarshi restorani va boshqa loyihalarning professional montaji, 4K Reels, beat-sync sound design.", "Bugun Agency, Video Montaj, Bravos Qarshi, Faol"),
                ("Rezonans Academy (Mustaqil Loyiha)", "mobilography", "Alohida mustaqil shaxsiy loyiha: iPhone 16 Pro Max orqali mobil videografiya va yangi o'quvchilarni jalb qilish uchun Meta Ads targetologiya (Faol).", "Mustaqil, Rezonans Academy, Mobil Videograf, Targetolog"),
                ("Rezonans English School (Mustaqil Loyiha)", "mobilography", "Alohida mustaqil shaxsiy loyiha: iPhone 16 Pro Max orqali kreativ trend Reels tasvirga olish va maqsadli auditoriyaga Meta Ads target (Faol).", "Mustaqil, Rezonans English School, Mobil Videograf, Targetolog"),
                ("Telegram Avtomatlashtirish Boti", "python", "Mijozlarga xizmat ko'rsatish, buyurtmalarni qabul qilish va to'lov tizimlari bilan integratsiyalashgan aqlli bot.", "Python, aiogram, SQLite, QDTU"),
                ("Motion Design & Dinamik Animatsiyalar", "video", "Video roliklar va Reels uchun kinetik tipografiya, 3D vizual elementlar, harakatli subtitrlar va trend motion animatsiyalari.", "Motion Design, Kinetik Tipografiya, Subtitrlar, VFX"),
                ("Web Scraping & Data Parser", "python", "Internetdagi ma'lumotlarni avtomatlashtirilgan tarzda yig'ish, tozalash va tayyor hisobot shakllantirish.", "Python, BeautifulSoup, Pandas, API")
            ]
            now = datetime.datetime.now().isoformat()
            cursor.executemany("""
                INSERT INTO projects (title, category, description, tags, created_at)
                VALUES (?, ?, ?, ?, ?)
            """, [(p[0], p[1], p[2], p[3], now) for p in initial_projects])

        conn.commit()

@contextmanager
def get_db():
    """Database connection generator."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()
