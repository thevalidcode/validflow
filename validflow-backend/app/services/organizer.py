from app.utils.file_rules import classify
from app.core.config import settings
from app.models.file_log import log_file
from pathlib import Path
import shutil

def smart_move(file_path: Path):
    if not file_path.exists():
        return

    category = classify(file_path)
    target_dir = settings.dest_dir / category
    target_dir.mkdir(parents=True, exist_ok=True)

    target_path = target_dir / file_path.name
    if not target_path.exists():
        shutil.move(str(file_path), str(target_path))
        log_file(file_path.name, category)
