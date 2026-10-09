import os
from pathlib import Path

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent
DB_PATH = BACKEND_DIR / "database.db"

# Server configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8080))

# Optional Telegram Bot Notifications for new client inquiries
# You can set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment or .env
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

# Admin secret key for protected operations
ADMIN_KEY = os.getenv("ADMIN_KEY", "sarvar2026")
