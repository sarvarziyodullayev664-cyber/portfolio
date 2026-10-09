import urllib.request
import urllib.parse
import json
import logging
from backend.config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

logger = logging.getLogger(__name__)

def send_telegram_notification(name: str, contact: str, service: str, message: str) -> bool:
    """Send alert to Sarvar's Telegram when a new client inquiry arrives."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        return False

    service_names = {
        "video": "🎬 Video Montaj",
        "mobilography": "📱 Mobilografiya & Reels",
        "smm": "🎯 SMM & Targetologiya",
        "python": "🐍 Python Dasturlash / Bot",
        "other": "💡 Boshqa taklif"
    }
    service_label = service_names.get(service, service)

    text = (
        "🚀 <b>Yangi Xabar (Portfolio Landing Page)!</b>\n\n"
        f"👤 <b>Mijoz:</b> {name}\n"
        f"📞 <b>Aloqa:</b> {contact}\n"
        f"🛠 <b>Xizmat:</b> {service_label}\n"
        f"💬 <b>Xabar:</b>\n{message}\n\n"
        "⚡ <i>Sarvar Ziyodullayev Portfolio Backend</i>"
    )

    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML"
    }

    try:
        data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(
            url,
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            return response.status == 200
    except Exception as e:
        logger.warning(f"Telegram notification could not be sent: {e}")
        return False
