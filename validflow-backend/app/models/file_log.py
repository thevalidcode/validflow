import sqlite3
from app.core.config import settings

settings.db_path.parent.mkdir(parents=True, exist_ok=True)

def init_db():
    conn = sqlite3.connect(settings.db_path)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            file_name TEXT,
            category TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    """)
    conn.commit()
    conn.close()


def log_file(file_name: str, category: str):
    conn = sqlite3.connect(settings.db_path)
    conn.execute(
        "INSERT INTO logs (file_name, category) VALUES (?, ?)",
        (file_name, category)
    )
    conn.commit()
    conn.close()


def get_all_logs():
    conn = sqlite3.connect(settings.db_path)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, file_name, category, timestamp FROM logs ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r[0], "file": r[1], "category": r[2], "time": r[3]} for r in rows]


init_db()
