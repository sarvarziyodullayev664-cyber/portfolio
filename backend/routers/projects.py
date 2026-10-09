from fastapi import APIRouter, HTTPException, Query
import datetime
from typing import List, Optional
from backend.database import get_db
from backend.models import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["Portfolio Projects"])

@router.get("", response_model=List[ProjectResponse])
async def get_projects(category: Optional[str] = Query(None, description="Filter category: video, mobilography, python")):
    """Get all portfolio projects or filter by category."""
    with get_db() as conn:
        cursor = conn.cursor()
        if category and category != "all":
            cursor.execute("SELECT * FROM projects WHERE category = ? ORDER BY id DESC", (category,))
        else:
            cursor.execute("SELECT * FROM projects ORDER BY id DESC")
        rows = cursor.fetchall()

        return [
            ProjectResponse(
                id=row["id"],
                title=row["title"],
                category=row["category"],
                description=row["description"],
                tags=row["tags"],
                created_at=row["created_at"]
            )
            for row in rows
        ]

@router.post("", response_model=dict)
async def create_project(payload: ProjectCreate):
    """Add a new project to the portfolio."""
    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO projects (title, category, description, tags, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, (payload.title, payload.category, payload.description, payload.tags, now_str))
        conn.commit()
        new_id = cursor.lastrowid

    return {"success": True, "message": "Yangi loyiha muvaffaqiyatli qo'shildi", "id": new_id}

@router.delete("/{project_id}", response_model=dict)
async def delete_project(project_id: int):
    """Delete a portfolio project."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Loyiha topilmadi")

    return {"success": True, "message": f"{project_id}-raqamli loyiha o'chirildi"}
