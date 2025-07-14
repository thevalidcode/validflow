import mimetypes
from pathlib import Path

def classify(file_path: Path) -> str:
    if not file_path.is_file():
        return "Others"

    mime, _ = mimetypes.guess_type(str(file_path))

    if mime:
        if "image" in mime:
            return "Images"
        elif "video" in mime:
            return "Videos"
        elif "audio" in mime:
            return "Music"
        elif "pdf" in mime or "document" in mime:
            return "Documents"
    if file_path.suffix in [".zip", ".rar"]:
        return "Archives"
    elif file_path.suffix in [".exe", ".dmg", ".AppImage"]:
        return "Installers"

    return "Others"
