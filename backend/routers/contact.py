from fastapi import APIRouter, Request, HTTPException, BackgroundTasks
import datetime
from typing import List
from backend.database import get_db
from backend.models import ContactCreate, ContactResponse, ContactStatusUpdate
from backend.routers.telegram_bot import send_telegram_notification

router = APIRouter(prefix="/api/contact", tags=["Contact / Leads"])

@router.post("", response_model=dict)
async def create_contact_message(
    payload: ContactCreate,
    request: Request,
    background_tasks: BackgroundTasks
):
    """Save client message into database and dispatch notifications."""
    client_ip = request.client.host if request.client else "unknown"
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    contact_val = payload.contact or payload.phone_or_telegram or payload.phone
    if not contact_val or len(contact_val.strip()) < 3:
        raise HTTPException(status_code=422, detail="Telefon raqami yoki Telegram username kiritilishi shart")

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO contacts (name, contact, service, message, ip_address, status, created_at)
            VALUES (?, ?, ?, ?, ?, 'yangi', ?)
        """, (payload.name, contact_val.strip(), payload.service or "video", payload.message, client_ip, now_str))
        conn.commit()
        new_id = cursor.lastrowid

    # Background task to send Telegram alert without slowing down user response
    background_tasks.add_task(
        send_telegram_notification,
        payload.name,
        contact_val.strip(),
        payload.service or "video",
        payload.message
    )

    return {
        "success": True,
        "message": f"Rahmat, {payload.name}! Xabaringiz Sarvar Ziyodullayevga muvaffaqiyatli yetkazildi.",
        "id": new_id
    }

@router.get("", response_model=List[ContactResponse])
async def get_all_contacts():
    """Retrieve all received client inquiries."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM contacts ORDER BY id DESC")
        rows = cursor.fetchall()
        
        return [
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
            for row in rows
        ]

@router.patch("/{contact_id}/status", response_model=dict)
async def update_contact_status(contact_id: int, payload: ContactStatusUpdate):
    """Change status of inquiry (e.g. yangi, boglanildi, yakunlandi)."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE contacts SET status = ? WHERE id = ?", (payload.status, contact_id))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Xabar topilmadi")

    return {"success": True, "message": "Status yangilandi", "status": payload.status}

@router.delete("/{contact_id}", response_model=dict)
async def delete_contact(contact_id: int):
    """Delete a contact message."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM contacts WHERE id = ?", (contact_id,))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Xabar topilmadi")

    return {"success": True, "message": f"{contact_id}-raqamli xabar o'chirildi"}
