from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from contextlib import asynccontextmanager
import uvicorn

from backend.config import BASE_DIR, HOST, PORT
from backend.database import init_db
from backend.routers import contact, profile, projects, stats

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database on startup
    init_db()
    print("=" * 60)
    print("  FASTAPI BACKEND ACTIVE - SARVAR ZIYODULLAYEV")
    print("  [+] Database: SQLite initialized")
    print(f"  [+] API Docs: http://localhost:{PORT}/docs")
    print(f"  [+] Admin Panel: http://localhost:{PORT}/admin")
    print("=" * 60)
    yield

app = FastAPI(
    title="Sarvar Ziyodullayev Portfolio API",
    description="Backend API for 3D Creative Portfolio & Software Engineering",
    version="2.0.0",
    lifespan=lifespan
)

# CORS Middleware (permits requests from frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(profile.router)
app.include_router(contact.router)
app.include_router(projects.router)
app.include_router(stats.router)

@app.get("/api/stats", tags=["Analytics & Stats"])
async def get_stats_alias():
    """Alias for /api/analytics returning site statistics."""
    return await stats.get_analytics_summary()

# Mount Static Directories for CSS, JS, and Assets
css_dir = BASE_DIR / "css"
js_dir = BASE_DIR / "js"
assets_dir = BASE_DIR / "assets"

if css_dir.exists():
    app.mount("/css", StaticFiles(directory=str(css_dir)), name="css")
if js_dir.exists():
    app.mount("/js", StaticFiles(directory=str(js_dir)), name="js")
if assets_dir.exists():
    app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

# Root endpoint serving the landing page
@app.get("/", include_in_schema=False)
async def serve_index():
    index_file = BASE_DIR / "index.html"
    return FileResponse(str(index_file))

# Admin Panel page
@app.get("/admin", include_in_schema=False)
async def serve_admin():
    admin_file = BASE_DIR / "admin.html"
    if admin_file.exists():
        return FileResponse(str(admin_file))
    return {"message": "Admin dashboard is loading..."}

# Health Check
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "developer": "Sarvar Ziyodullayev",
        "university": "Qarshi Davlat Texnika Universiteti",
        "major": "Dasturiy Injenering",
        "framework": "FastAPI (Python 3.13)"
    }

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=HOST, port=PORT, reload=True)
