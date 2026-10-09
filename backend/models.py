from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Mijoz ismi")
    contact: Optional[str] = Field(None, description="Telefon yoki Telegram username")
    phone_or_telegram: Optional[str] = Field(None, description="Muqobil telefon/telegram maydoni")
    phone: Optional[str] = Field(None, description="Muqobil telefon maydoni")
    service: Optional[str] = Field("video", description="Xizmat turi (video, mobilography, smm, python, other)")
    message: str = Field(..., min_length=3, max_length=2000, description="Loyiha tavsifi")

class ContactStatusUpdate(BaseModel):
    status: str = Field(..., description="Yangi status: 'yangi', 'boglanildi', 'yakunlandi'")

class ContactResponse(BaseModel):
    id: int
    name: str
    contact: str
    service: Optional[str]
    message: str
    ip_address: Optional[str]
    status: str
    created_at: str

class ProjectCreate(BaseModel):
    title: str
    category: str
    description: str
    tags: Optional[str] = ""

class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    description: str
    tags: Optional[str]
    created_at: str

class AnalyticsStats(BaseModel):
    total_visits: int
    total_contacts: int
    new_inquiries: int
    conversion_rate: float
    services_breakdown: Dict[str, int]
    recent_contacts: List[ContactResponse]
