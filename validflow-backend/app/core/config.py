from pathlib import Path

class Settings:
    watch_dir: Path = Path.home() / "Downloads"
    dest_dir: Path = Path.home() / "Documents/ValidFlow"
    db_path: Path = Path.home() / "Documents/ValidFlow/db/validflow.db"

settings = Settings()
