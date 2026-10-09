from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(prefix="/api/profile", tags=["Sarvar Profile"])

@router.get("", response_model=Dict[str, Any])
async def get_profile_data():
    """Get complete biography, skills, education, sports, and contacts for Sarvar Ziyodullayev."""
    return {
        "identity": {
            "first_name": "Sarvar",
            "last_name": "Ziyodullayev",
            "full_name": "Sarvar Ziyodullayev",
            "age": 19,
            "roles": [
                "Video Montajor",
                "Mobil Videograf",
                "Motion Designer",
                "Python Developer",
                "SMM Mutaxassis & Targetolog",
                "Dasturiy Injenering Talabasi"
            ]
        },
        "education": {
            "university": "Qarshi Davlat Texnika Universiteti (QDTU)",
            "course": "3-kurs talabasi",
            "faculty": "Dasturiy Injenering (Software Engineering)",
            "school": "Kitob tumani 1-maktab bitiruvchisi",
            "current_status": "3-kurs faol talaba"
        },
        "location": {
            "country": "O'zbekiston",
            "region": "Qashqadaryo viloyati",
            "current_activity": "Qarshi shahri (Asosiy faoliyat markazi)",
            "birthplace": "Kitob tumani, Beruniy ko'cha 24-uy"
        },
        "hardware_setup": {
            "primary_laptop": "HP Victus",
            "external_display": "Tashqi Monitor (Dual-Screen Pro Setup)",
            "mobile_device": "iPhone 16 Pro Max",
            "workflow": "Montaj ko'pincha HP Victus laptopi va qo'shimcha monitor orqali Premiere Pro / DaVinci Resolve dasturlarida hamda telefon orqali amalga oshiriladi"
        },
        "skills": {
            "media": [
                {"name": "Video Montaj", "setup": "HP Victus Laptop + Tashqi Monitor & Telefon", "tools": ["HP Victus", "Tashqi Monitor", "Premiere Pro", "DaVinci Resolve", "CapCut Pro"], "level": "96%"},
                {"name": "Mobil Videografiya", "description": "iPhone 16 Pro Max orqali kreativ va brendga mos reels tayyorlash", "tools": ["iPhone 16 Pro Max", "4K 60FPS", "Gimbal", "Cinematic Reels"], "level": "96%"},
                {"name": "Motion Design & Animatsiya", "description": "Kinetik tipografiya, dinamik subtitrlar, vizual VFX effektlar va trend motion animatsiyalar", "tools": ["Kinetik Tipografiya", "Harakatli Subtitrlar", "Visual Effects", "Dinamik Perexodlar"], "level": "92%"},
                {"name": "SMM & Targetologiya", "tools": ["Meta Ads", "Instagram", "Facebook", "Auditoriya tahlili"], "level": "88%"}
            ],
            "ai_tools": [
                {
                    "name": "Sun'iy Intellekt Vositalari (AI Tools)",
                    "tools": ["ChatGPT", "Google Gemini", "Claude", "Flow AI", "Antigravity"],
                    "level": "96%",
                    "description": "Sun'iy intellekt vositalaridan professional foydalanish: ssenariy, kontent-reja, montaj g'oyalari, kod generatsiyasi va avtomatlashtirish"
                }
            ],
            "development": [
                {"name": "Python Development", "tools": ["aiogram", "Scraping", "Automation", "OOP"], "level": "90%"},
                {"name": "Dasturiy Injenering", "tools": ["Algoritmlar", "Ma'lumotlar tuzilmasi", "Tizim arxitekturasi"], "level": "88%"},
                {"name": "Ma'lumotlar Bazasi", "tools": ["SQLite", "PostgreSQL", "SQL"], "level": "82%"},
                {"name": "Versiya Boshqaruvi", "tools": ["Git", "GitHub"], "level": "85%"}
            ]
        },
        "sports": [
            {"name": "Body Builder", "focus": "Temir iroda, intizom va chidamlilik"},
            {"name": "Futbol", "focus": "Taktika va jamoaviy harakat"},
            {"name": "Basketbol", "focus": "Dinamika, sakrash va tezlik"},
            {"name": "Volleyball", "focus": "Reaksiya va havo koordinatsiyasi"},
            {"name": "PingPong", "focus": "Yuqori diqqat va mikro-reaksiya"}
        ],
        "hobbies": [
            {"name": "Playstation Games", "focus": "3D visual grafika va storytelling"},
            {"name": "Reading Books", "focus": "Shaxsiy rivojlanish va tafakkur"},
            {"name": "Ingliz tili (English)", "focus": "Global media va IT standartlari"}
        ],
        "experience": {
            "period": "Media sohasida 2 yil tajriba (Hozirda ham barcha loyihalar bilan faol)",
            "agency_affiliation": {
                "agency_name": "Bugun Agency",
                "handle": "@bugun_agency",
                "instagram_url": "https://instagram.com/bugun_agency",
                "role": "Video Montajor",
                "status": "Hozirda faol ishlab kelinmoqda",
                "scope": "@bravos_qarshi va agentlikning boshqa loyihalari video montaji"
            },
            "independent_projects": [
                {
                    "name": "Rezonans Academy",
                    "handle": "@rezonans_academy",
                    "instagram_url": "https://instagram.com/rezonans_academy",
                    "role": "Mobil Videograf + Targetolog",
                    "status": "Hozirda faol ishlab kelinmoqda",
                    "type": "Mustaqil shaxsiy loyiha",
                    "tools": "iPhone 16 Pro Max, Meta Ads"
                },
                {
                    "name": "Rezonans English School",
                    "handle": "@rezonans_english_school",
                    "instagram_url": "https://instagram.com/rezonans_english_school",
                    "role": "Mobil Videograf + Targetolog",
                    "status": "Hozirda faol ishlab kelinmoqda",
                    "type": "Mustaqil shaxsiy loyiha",
                    "tools": "iPhone 16 Pro Max, Meta Ads"
                }
            ],
            "featured_clients": [
                {
                    "name": "Bugun Agency",
                    "handle": "@bugun_agency",
                    "instagram_url": "https://instagram.com/bugun_agency",
                    "category": "Media Agentlik",
                    "role": "Video Montajor",
                    "status": "Faol",
                    "note": "@bravos_qarshi va boshqa loyihalar montaji"
                },
                {
                    "name": "Bravos Qarshi",
                    "handle": "@bravos_qarshi",
                    "instagram_url": "https://instagram.com/bravos_qarshi",
                    "category": "Restoran & Taomlar Kontenti",
                    "role": "Video Montajor (Bugun Agency doirasida)",
                    "status": "Faol"
                },
                {
                    "name": "Rezonans Academy",
                    "handle": "@rezonans_academy",
                    "instagram_url": "https://instagram.com/rezonans_academy",
                    "category": "Ta'lim Markazi & Reels",
                    "role": "Mobil Videograf + Targetolog",
                    "status": "Faol (Mustaqil loyiha)"
                },
                {
                    "name": "Rezonans English School",
                    "handle": "@rezonans_english_school",
                    "instagram_url": "https://instagram.com/rezonans_english_school",
                    "category": "Ingliz Tili Maktabi",
                    "role": "Mobil Videograf + Targetolog",
                    "status": "Faol (Mustaqil loyiha)"
                }
            ]
        },
        "contacts": {
            "telegram": "https://t.me/Sarvarbek_zs",
            "instagram": "https://instagram.com/sarvarvision_",
            "phone": "+998 95 612 07 15",
            "email": "sarvarziyodullayev346@gmail.com"
        }
    }
