from fastapi import APIRouter, Request
import datetime
from backend.database import get_db
from backend.models import AnalyticsStats, ContactResponse

router = APIRouter(prefix="/api/analytics", tags=["Analytics & Stats"])

@router.post("/visit", response_model=dict)
async def record_visit(request: Request):
    """Record a page visit for analytics."""
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "unknown")
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO analytics (ip_address, user_agent, visited_at)
            VALUES (?, ?, ?)
        """, (client_ip, user_agent, now_str))
        conn.commit()

    return {"status": "ok"}

@router.get("", response_model=AnalyticsStats)
async def get_analytics_summary():
    """Get portfolio visitor statistics and conversion overview."""
    with get_db() as conn:
        cursor = conn.cursor()

        # Total visits
        cursor.execute("SELECT COUNT(*) FROM analytics")
        total_visits = cursor.fetchone()[0]

        # Total inquiries
        cursor.execute("SELECT COUNT(*) FROM contacts")
        total_contacts = cursor.fetchone()[0]

        # New inquiries
        cursor.execute("SELECT COUNT(*) FROM contacts WHERE status = 'yangi'")
        new_inquiries = cursor.fetchone()[0]

        # Conversion rate
        conv_rate = (total_contacts / total_visits * 100) if total_visits > 0 else 0.0

        # Services breakdown
        cursor.execute("SELECT service, COUNT(*) as count FROM contacts GROUP BY service")
        breakdown_rows = cursor.fetchall()
        services_breakdown = {row["service"] or "other": row["count"] for row in breakdown_rows}

        # Recent 5 contacts
        cursor.execute("SELECT * FROM contacts ORDER BY id DESC LIMIT 5")
        recent_rows = cursor.fetchall()
        recent_contacts = [
            ContactResponse(
                id=row["id"],
                name=row["name"],
                contact=row["contact"],
                service=row["service"],
                message=row["message"],
                ip_address=row["ip_address"],
                status=row["status"],
                created_at=row["created_at"]
            )
            for row in recent_rows
        ]

        return AnalyticsStats(
            total_visits=total_visits,
            total_contacts=total_contacts,
            new_inquiries=new_inquiries,
            conversion_rate=round(conv_rate, 2),
            services_breakdown=services_breakdown,
            recent_contacts=recent_contacts
        )
