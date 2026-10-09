import uvicorn
import webbrowser
import os
import sys
import threading
import time

# Ensure UTF-8 output on Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 8080
os.chdir(os.path.dirname(os.path.abspath(__file__)))

def open_browser(port):
    time.sleep(1.2)
    url = f"http://localhost:{port}"
    print(f"  [+] Sayt brauzerda ochilmoqda: {url}")
    webbrowser.open(url)

def main():
    print("=" * 65)
    print("  🚀 SARVAR ZIYODULLAYEV - 3D PORTFOLIO FASTAPI BACKEND")
    print("=" * 65)
    print(f"  [+] Asosiy sayt:        http://localhost:{PORT}")
    print(f"  [+] Admin Dashboard:    http://localhost:{PORT}/admin")
    print(f"  [+] Swagger API Docs:   http://localhost:{PORT}/docs")
    print(f"  [+] ReDoc:              http://localhost:{PORT}/redoc")
    print("  [+] Ma'lumotlar bazasi: SQLite (backend/database.db)")
    print("  [+] To'xtatish uchun:   Ctrl + C bosing")
    print("=" * 65)

    threading.Thread(target=open_browser, args=(PORT,), daemon=True).start()

    try:
        uvicorn.run("backend.main:app", host="0.0.0.0", port=PORT, reload=False)
    except OSError:
        alt_port = 5500
        print(f"  [!] Port {PORT} band, {alt_port} ishlatilmoqda...")
        threading.Thread(target=open_browser, args=(alt_port,), daemon=True).start()
        uvicorn.run("backend.main:app", host="0.0.0.0", port=alt_port, reload=False)

if __name__ == '__main__':
    main()
