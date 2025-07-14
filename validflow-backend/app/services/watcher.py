from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from app.services.organizer import smart_move
from app.core.config import settings
from pathlib import Path
import time
from watchdog.events import FileSystemEvent


class ValidFlowHandler(FileSystemEventHandler):
    def on_created(self, event: FileSystemEvent):
        path = Path(str(event.src_path))
        if path.is_file():
            smart_move(path)


def start_watching():
    observer = Observer()
    observer.schedule(ValidFlowHandler(), str(
        settings.watch_dir), recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
