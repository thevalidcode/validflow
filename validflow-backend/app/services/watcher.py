import os
import shutil
import re
import time
from datetime import datetime
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler, FileSystemEvent

from app.core.db import SessionLocal
from app.models.rule import Rule
from app.core.config import settings
from app.crud.error_log import create_log


class FileHandler(FileSystemEventHandler):
    def __init__(self, watch_dir: str):
        self.watch_dir = watch_dir

    def on_created(self, event: FileSystemEvent):
        if event.is_directory:
            return
        file_path = str(event.src_path)
        try:
            self.apply_rules(file_path)
        except Exception as e:
            self.log_error(
                error_name="WatcherError",
                message=str(e),
                file_path=file_path,
                stack_trace="",
            )

    def apply_rules(self, file_path: str):
        file_name = os.path.basename(file_path)
        file_size_kb = os.path.getsize(file_path) / 1024

        with SessionLocal() as db:
            rules: list[Rule] = db.query(Rule).filter(
                Rule.enabled == True).order_by(Rule.priority).all()

            for rule in rules:
                conditions = rule.conditions
                actions = rule.actions

                try:
                    # Check extensions
                    ext = Path(file_name).suffix.lower().replace(".", "")
                    if conditions.get("extensions") and ext not in [e.lower() for e in conditions["extensions"]]:
                        continue

                    # Name regex
                    name_regex = conditions.get("name_regex")
                    if name_regex and not re.match(name_regex, file_name):
                        continue

                    # Contains text
                    contains_text = conditions.get("contains_text")
                    if contains_text:
                        try:
                            with open(file_path, "r", errors="ignore") as f:
                                content = f.read()
                            if contains_text not in content:
                                continue
                        except Exception:
                            continue

                    # Source path contains
                    source_contains = conditions.get("source_contains")
                    if source_contains and source_contains not in file_path:
                        continue

                    # Size constraints
                    min_size = conditions.get("size_min_kb")
                    max_size = conditions.get("size_max_kb")
                    if (min_size and file_size_kb < min_size) or (max_size and file_size_kb > max_size):
                        continue

                    # Perform actions
                    if actions.get("delete"):
                        os.remove(file_path)
                        print(f"🗑 Deleted {file_path}")
                    else:
                        dest = actions.get("move_to") or self.watch_dir
                        rename_template = actions.get(
                            "rename_template") or "{name}{ext}"
                        new_name = rename_template.replace(
                            "{name}", Path(file_name).stem
                        ).replace(
                            "{ext}", Path(file_name).suffix
                        ).replace(
                            "{date}", datetime.now().strftime("%Y%m%d")
                        )
                        self.move_file(file_path, os.path.join(dest, new_name))

                    if rule.stop_on_match:
                        break

                except Exception as e:
                    # Log the error for this file/rule
                    self.log_error(
                        error_name="RuleProcessingError",
                        message=str(e),
                        file_path=file_path,
                        stack_trace="",
                    )

    def move_file(self, src: str, dest: str):
        dest_path = Path(dest)
        try:
            dest_path.parent.mkdir(parents=True, exist_ok=True)

            counter = 1
            final_dest = dest_path
            while final_dest.exists():
                final_dest = dest_path.parent / \
                    f"{dest_path.stem}({counter}){dest_path.suffix}"
                counter += 1

            # Retry for temporary file locks or permission issues
            for attempt in range(5):
                try:
                    shutil.move(src, final_dest)
                    print(f"✅ Moved {src} → {final_dest}")
                    break
                except (PermissionError, OSError) as e:
                    print(
                        f"⚠️ Move attempt {attempt+1} failed: {e}, retrying..."
                    )
                    time.sleep(0.5)
            else:
                self.log_error(
                    error_name="MoveFailed",
                    message=f"Failed to move file after retries",
                    file_path=src,
                    stack_trace="",
                )
        except Exception as e:
            self.log_error(
                error_name="MoveError",
                message=str(e),
                file_path=src,
                stack_trace="",
            )

    def log_error(
        self,
        error_name: str,
        category: str = "file_watcher",
        message: str | None = None,
        file_path: str | None = None,
        line_number: int | None = None,
        stack_trace: str | None = None,
    ):
        try:
            with SessionLocal() as db:
                create_log(
                    db=db,
                    error_name=error_name,
                    category=category,
                    message=message,
                    file_path=file_path,
                    line_number=line_number,
                    stack_trace=stack_trace,
                )
        except Exception as e:
            print(f"❌ Failed to log error: {e}")


def start_watcher():
    watch_dir = str(settings.watch_dir)
    event_handler = FileHandler(watch_dir)
    observer = Observer()
    observer.schedule(event_handler, watch_dir, recursive=True)
    observer.start()
    print(f"👀 Watching directory: {watch_dir}")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
