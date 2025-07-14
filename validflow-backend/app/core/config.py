from pathlib import Path

class Settings:
    watch_dir: Path = Path.home() / "Downloads"
    dest_dir: Path = Path.home() / "Documents/ValidFlow"
    db_path: Path = Path(__file__).resolve().parent.parent / "file_logs.db"

settings = Settings()
